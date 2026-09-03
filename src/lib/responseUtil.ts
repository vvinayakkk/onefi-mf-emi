import { NextResponse } from 'next/server';
import { ApiResponse, APP_CONFIG } from '@/constants/app';
import { AppError, ERROR_REGISTRY, HTTP_STATUS } from '@/constants/errors';
import { ZodError } from 'zod';

export class ResponseUtil {
  public static success<T>(data: T, statusCode: number = HTTP_STATUS.OK, count?: number): NextResponse<ApiResponse<T>> {
    return NextResponse.json(
      {
        success: true,
        statusCode,
        data,
        meta: {
          timestamp: new Date().toISOString(),
          version: APP_CONFIG.API_VERSION,
          count: count ?? (Array.isArray(data) ? data.length : undefined),
        },
      },
      { status: statusCode }
    );
  }

  public static error(error: unknown): NextResponse<ApiResponse<null>> {
    console.error('[API Error]:', error);

    if (error instanceof AppError) {
      return NextResponse.json(
        {
          success: false,
          statusCode: error.status,
          error: {
            code: error.code,
            message: error.message,
            details: error.details,
          },
          meta: {
            timestamp: new Date().toISOString(),
            version: APP_CONFIG.API_VERSION,
          },
        },
        { status: error.status }
      );
    }

    if (error instanceof ZodError) {
      return NextResponse.json(
        {
          success: false,
          statusCode: ERROR_REGISTRY.VALIDATION_ERROR.status,
          error: {
            code: ERROR_REGISTRY.VALIDATION_ERROR.code,
            message: 'Input validation error',
            details: error.flatten().fieldErrors,
          },
          meta: {
            timestamp: new Date().toISOString(),
            version: APP_CONFIG.API_VERSION,
          },
        },
        { status: ERROR_REGISTRY.VALIDATION_ERROR.status }
      );
    }

    return NextResponse.json(
      {
        success: false,
        statusCode: ERROR_REGISTRY.INTERNAL_SERVER_ERROR.status,
        error: {
          code: ERROR_REGISTRY.INTERNAL_SERVER_ERROR.code,
          message: ERROR_REGISTRY.INTERNAL_SERVER_ERROR.message,
        },
        meta: {
          timestamp: new Date().toISOString(),
          version: APP_CONFIG.API_VERSION,
        },
      },
      { status: ERROR_REGISTRY.INTERNAL_SERVER_ERROR.status }
    );
  }
}
