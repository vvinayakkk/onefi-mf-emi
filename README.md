# 1Fi SDE1 Assignment - Mutual Fund Backed EMI Web Application

A full-stack web application developed for the **1Fi SDE1 Assignment** that displays products (flagship smartphones, laptops) with multiple dynamic EMI plans backed by mutual funds, featuring clean architecture, SOLID design principles, zero hardcoding, and PostgreSQL database integration with Prisma ORM.

---

## 🌟 Live Demo & Video Deliverables

- **Live Deployed App (Vercel)**: [https://onefi-mf-emi.vercel.app](https://onefi-mf-emi.vercel.app)
- **GitHub Repository**: [https://github.com/vvinayakkk/onefi-mf-emi](https://github.com/vvinayakkk/onefi-mf-emi)
- **Demo Walkthrough Video**: *(Upload to Google Drive / YouTube with public link)*

---

## 🛠️ Tech Stack & Engineering Standards

- **Frontend**: Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS, Lucide Icons, Canvas Confetti.
- **Backend**: Next.js Server Components + Type-safe Route Handlers (`/api/v1/*`).
- **Database & ORM**: PostgreSQL (hosted on Neon Serverless Postgres), Prisma ORM.
- **Design & Architecture**:
  - **SOLID Principles**: Clean separation of Concerns (Presentation -> Services -> Repositories -> ORM).
  - **Zero Hardcoding**: Centralized error codes in `src/constants/errors.ts` and app constants in `src/constants/app.ts`.
  - **Type-safe Validation**: Zod schema validation on all mutation endpoints.
  - **Resilience**: Dual-mode data access (PostgreSQL live database with in-memory fallback).

---

## 📐 Database Schema

```prisma
model Product {
  id          String           @id @default(cuid())
  slug        String           @unique
  name        String
  brand       String
  category    String           @default("Smartphones")
  description String
  basePrice   Float
  mrp         Float
  badge       String?          // e.g. "NEW", "FLAGSHIP"
  rating      Float            @default(4.8)
  reviewCount Int              @default(1250)
  createdAt   DateTime         @default(now())
  updatedAt   DateTime         @updatedAt
  variants    ProductVariant[]
  emiPlans    EmiPlan[]

  @@index([slug])
  @@index([brand])
}

model ProductVariant {
  id           String      @id @default(cuid())
  productId    String
  product      Product     @relation(fields: [productId], references: [id], onDelete: Cascade)
  title        String      // e.g. "Desert Titanium / 256 GB"
  colorName    String      // e.g. "Desert Titanium"
  colorHex     String      // e.g. "#D4A373"
  storage      String      // e.g. "256 GB"
  mrp          Float
  price        Float
  imageUrl     String
  stockCount   Int         @default(25)
  isDefault    Boolean     @default(false)
  createdAt    DateTime    @default(now())
  updatedAt    DateTime    @updatedAt
  orders       Order[]

  @@index([productId])
}

model EmiPlan {
  id                String      @id @default(cuid())
  productId         String?
  product           Product?    @relation(fields: [productId], references: [id], onDelete: Cascade)
  tenureMonths      Int         // 3, 6, 12, 24, 36, 48, 60
  interestRate      Float       // 0.0 or 10.5
  cashbackAmount    Float       @default(0.0) // e.g. 7500
  isPopular         Boolean     @default(false)
  minDownPayment    Float       @default(0.0)
  mutualFundBacking String      @default("1Fi Liquid Alpha Fund")
  processingFee     Float       @default(0.0)
  createdAt         DateTime    @default(now())

  @@index([productId])
  @@index([tenureMonths])
}

model Order {
  id            String         @id @default(cuid())
  orderNumber   String         @unique
  customerName  String
  customerEmail String
  customerPhone String
  status        OrderStatus    @default(PENDING)
  totalAmount   Float
  downPayment   Float
  tenureMonths  Int
  monthlyEmi    Float
  interestRate  Float
  cashback      Float          @default(0.0)
  variantId     String
  variant       ProductVariant @relation(fields: [variantId], references: [id])
  createdAt     DateTime       @default(now())
  updatedAt     DateTime       @updatedAt

  @@index([orderNumber])
  @@index([customerEmail])
}
```

---

## 🚀 Setup & Run Instructions

### 1. Clone & Install Dependencies
```bash
git clone https://github.com/vvinayakkk/onefi-mf-emi.git
cd onefi-mf-emi
npm install
```

### 2. Configure Environment Variables
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```
Provide your PostgreSQL connection string in `DATABASE_URL`.

### 3. Database Push & Seeding
```bash
npx prisma db push
npx tsx prisma/seed.ts
```

### 4. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the application.

---

## 📡 API Endpoints & Example Responses

### 1. Health Status
`GET /api/v1/health`
```json
{
  "success": true,
  "statusCode": 200,
  "data": {
    "status": "healthy",
    "uptime": 142.5,
    "timestamp": "2026-09-03T17:50:00.000Z",
    "database": {
      "status": "connected (PostgreSQL via Prisma)",
      "latencyMs": 14
    },
    "service": "1Fi SDE1 Mutual Fund Backed EMI Engine"
  }
}
```

### 2. List Products
`GET /api/v1/products`
```json
{
  "success": true,
  "statusCode": 200,
  "data": [
    {
      "slug": "apple-iphone-17-pro",
      "name": "iPhone 17 Pro",
      "brand": "Apple",
      "basePrice": 127400,
      "mrp": 134900,
      "variants": [ ... ],
      "emiPlans": [ ... ]
    }
  ]
}
```

### 3. Get Product by Slug
`GET /api/v1/products/apple-iphone-17-pro`

### 4. EMI Calculation Engine
`POST /api/v1/emi/calculate`
**Payload:**
```json
{
  "principalAmount": 127400,
  "tenureMonths": 12,
  "annualInterestRate": 0,
  "cashbackAmount": 7500
}
```
**Response:**
```json
{
  "success": true,
  "statusCode": 200,
  "data": {
    "principal": 127400,
    "loanAmount": 127400,
    "tenureMonths": 12,
    "annualInterestRate": 0,
    "monthlyEmi": 10617,
    "totalPayable": 127400,
    "totalInterest": 0,
    "cashback": 7500,
    "effectiveCost": 119900,
    "savingsVersusCreditCard": 11340
  }
}
```

### 5. Submit Order Application
`POST /api/v1/orders`
```json
{
  "customerName": "Vinayak Sharma",
  "customerEmail": "vinayak@example.com",
  "customerPhone": "9876543210",
  "variantId": "Desert Titanium / 256 GB",
  "totalAmount": 127400,
  "tenureMonths": 12,
  "monthlyEmi": 10617,
  "interestRate": 0,
  "cashback": 7500
}
```

---

## ⚖️ Clean Code Principles Demonstrated
- **Modular Services**: Isolated EMI amortization and MF yield mathematics.
- **Centralized Error Codes**: Every API error inherits from standard error contracts with distinct HTTP status codes.
- **Dynamic Routing**: Unique slug routing with high-performance SSR and SEO metadata.
- **Interactive UI**: Pixel-accurate implementation of 1Fi mockups with variant switching, live plan recalculations, and checkout flows.
