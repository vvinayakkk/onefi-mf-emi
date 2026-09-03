# 1Fi Mutual Fund Backed EMI Web Application

A full-stack web application that displays products (flagship smartphones and laptops) with dynamic EMI plans backed by institutional mutual funds, dynamic variant selection, pricing, interest calculations, and order checkout flows connected to a PostgreSQL database with Prisma ORM.

---

## 🌟 Live Demo & Repository

- **Live Deployed App**: [https://onefi-mf-emi.vercel.app](https://onefi-mf-emi.vercel.app)
- **GitHub Repository**: [https://github.com/vvinayakkk/onefi-mf-emi](https://github.com/vvinayakkk/onefi-mf-emi)

---

## 🛠️ Tech Stack

- **Frontend**: Next.js (App Router), React, TypeScript, Tailwind CSS, Lucide Icons.
- **Backend**: Node.js Serverless Route Handlers (`/api/v1/*`).
- **Database & ORM**: PostgreSQL (Neon Serverless), Prisma ORM.
- **Validation**: Zod schema validation.

---

## 🚀 Quick Setup & Local Run Instructions

Follow these step-by-step instructions to clone, configure, seed, and run this project locally or initialize it as your own repository.

### 1. Clone or Copy the Repository
```bash
git clone https://github.com/vvinayakkk/onefi-mf-emi.git
cd onefi-mf-emi
```

### 2. (Optional) Re-initialize as Your Own Fresh Git Repository
If you want to push this project under your own GitHub account:
```bash
# On Mac/Linux:
rm -rf .git
git init
git add .
git commit -m "Initial commit: 1Fi full-stack EMI application"
git branch -M main
git remote add origin https://github.com/<YOUR_GITHUB_USERNAME>/<YOUR_REPO_NAME>.git
git push -u origin main

# On Windows (PowerShell):
Remove-Item -Recurse -Force .git
git init
git add .
git commit -m "Initial commit: 1Fi full-stack EMI application"
git branch -M main
git remote add origin https://github.com/<YOUR_GITHUB_USERNAME>/<YOUR_REPO_NAME>.git
git push -u origin main
```

---

### 3. Install Dependencies
```bash
npm install
```

---

### 4. Setup Environment Variables (`.env`)
Create a `.env` file in the project root by copying the template:

```bash
cp .env.example .env
```

Open `.env` and set your PostgreSQL database connection URL (you can get a free instant database from [neon.tech](https://neon.tech) or Supabase):

```env
DATABASE_URL="postgresql://<USER>:<PASSWORD>@<HOST>/<DATABASE>?sslmode=require"
```

---

### 5. Push Database Schema & Run Seeding
Run Prisma schema sync to create the tables in your PostgreSQL database, followed by the seed script:

```bash
# 1. Push schema tables to database
npx prisma db push

# 2. Seed products, variants, and EMI plans into database
npx tsx prisma/seed.ts
```

---

### 6. Run the Application Locally
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## ☁️ Deployment Instructions (Vercel)

Deploying both frontend, backend APIs, and PostgreSQL connectivity takes less than 2 minutes:

### Option A: Using Vercel CLI
```bash
# 1. Login to Vercel
npx vercel login

# 2. Add your database connection string to production environment
npx vercel env add DATABASE_URL production

# 3. Deploy to production
npx vercel --prod
```

### Option B: Using Vercel Web Dashboard
1. Push your repository to your GitHub account.
2. Go to [https://vercel.com/new](https://vercel.com/new).
3. Import your repository.
4. Under **Environment Variables**, add:
   - `DATABASE_URL`: *(Your PostgreSQL connection string)*
5. Click **Deploy**.

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
  badge       String?
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
  title        String
  colorName    String
  colorHex     String
  storage      String
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
  tenureMonths      Int
  interestRate      Float
  cashbackAmount    Float       @default(0.0)
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

## 📡 API Endpoints & Example Responses

### 1. Health Status
`GET /api/v1/health`
```json
{
  "success": true,
  "statusCode": 200,
  "data": {
    "status": "healthy",
    "database": {
      "status": "connected (PostgreSQL via Prisma)",
      "latencyMs": 28
    }
  }
}
```

### 2. List Products
`GET /api/v1/products`

### 3. Get Product by Slug
`GET /api/v1/products/:slug` (e.g. `GET /api/v1/products/apple-iphone-17-pro`)

### 4. Calculate Custom EMI
`POST /api/v1/emi/calculate`
```json
{
  "principalAmount": 127400,
  "tenureMonths": 12,
  "annualInterestRate": 0,
  "cashbackAmount": 7500
}
```

### 5. Submit Order Application
`POST /api/v1/orders`
```json
{
  "customerName": "John Doe",
  "customerEmail": "john@example.com",
  "customerPhone": "9876543210",
  "variantId": "cmtltqnja000x11dc7pk9oyi8",
  "totalAmount": 127400,
  "tenureMonths": 12,
  "monthlyEmi": 10617,
  "interestRate": 0,
  "cashback": 7500
}
```
