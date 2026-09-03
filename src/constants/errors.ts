export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  UNPROCESSABLE_ENTITY: 422,
  INTERNAL_SERVER_ERROR: 500,
  SERVICE_UNAVAILABLE: 503,
} as const;

export interface AppErrorDefinition {
  code: string;
  status: number;
  message: string;
}

export const ERROR_REGISTRY = {
  // Product & Variant Errors (404 / 400)
  PRODUCT_NOT_FOUND: {
    code: 'ERR_PRODUCT_NOT_FOUND',
    status: HTTP_STATUS.NOT_FOUND,
    message: 'The requested product could not be found.',
  },
  PRODUCT_SLUG_REQUIRED: {
    code: 'ERR_PRODUCT_SLUG_REQUIRED',
    status: HTTP_STATUS.BAD_REQUEST,
    message: 'Product slug parameter is mandatory.',
  },
  VARIANT_NOT_FOUND: {
    code: 'ERR_VARIANT_NOT_FOUND',
    status: HTTP_STATUS.NOT_FOUND,
    message: 'The selected product variant does not exist.',
  },

  // EMI Plan Errors
  EMI_PLAN_NOT_FOUND: {
    code: 'ERR_EMI_PLAN_NOT_FOUND',
    status: HTTP_STATUS.NOT_FOUND,
    message: 'Selected EMI plan configuration is invalid or expired.',
  },
  INVALID_TENURE: {
    code: 'ERR_INVALID_TENURE',
    status: HTTP_STATUS.BAD_REQUEST,
    message: 'Tenure must be one of: 3, 6, 12, 24, 36, 48, or 60 months.',
  },
  INVALID_DOWN_PAYMENT: {
    code: 'ERR_INVALID_DOWN_PAYMENT',
    status: HTTP_STATUS.BAD_REQUEST,
    message: 'Down payment cannot exceed product price or be negative.',
  },

  // Order & Checkout Errors
  ORDER_CREATION_FAILED: {
    code: 'ERR_ORDER_CREATION_FAILED',
    status: HTTP_STATUS.INTERNAL_SERVER_ERROR,
    message: 'Could not create EMI application order.',
  },
  ORDER_NOT_FOUND: {
    code: 'ERR_ORDER_NOT_FOUND',
    status: HTTP_STATUS.NOT_FOUND,
    message: 'Order with specified identifier was not found.',
  },

  // Validation & Input Errors
  VALIDATION_ERROR: {
    code: 'ERR_VALIDATION_FAILED',
    status: HTTP_STATUS.UNPROCESSABLE_ENTITY,
    message: 'Invalid payload submitted. Check field requirements.',
  },

  // Database & System Errors
  DATABASE_CONNECTION_ERROR: {
    code: 'ERR_DB_CONNECTION',
    status: HTTP_STATUS.SERVICE_UNAVAILABLE,
    message: 'Database service is currently unreachable.',
  },
  INTERNAL_SERVER_ERROR: {
    code: 'ERR_INTERNAL_SERVER',
    status: HTTP_STATUS.INTERNAL_SERVER_ERROR,
    message: 'An unexpected internal error occurred on the server.',
  },
} as const;

export type ErrorKey = keyof typeof ERROR_REGISTRY;

export class AppError extends Error {
  public readonly code: string;
  public readonly status: number;
  public readonly details?: unknown;

  constructor(errorDef: AppErrorDefinition, details?: unknown) {
    super(errorDef.message);
    this.name = 'AppError';
    this.code = errorDef.code;
    this.status = errorDef.status;
    this.details = details;
    Object.setPrototypeOf(this, AppError.prototype);
  }
}
