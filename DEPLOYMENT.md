# Deployment Guide: Lahore Elite School LMS

## Free-Tier Deployment Options

This application is designed for frictionless deployment on modern cloud platforms with zero mandatory paid services.

### Recommended Stack

1. **Frontend / Application Server:** Vercel (Hobby Free Tier) or Netlify
2. **Database:** Neon PostgreSQL (Free Tier) or Supabase PostgreSQL (Free Tier)
3. **Static Media & Assets:** Stored in `/public/images/` or Cloudinary / Supabase Storage Free Tier

---

## Deployment Steps (Vercel + Neon/Supabase PostgreSQL)

### Step 1: Provision Free PostgreSQL Database
1. Create a free PostgreSQL instance on [Neon](https://neon.tech) or [Supabase](https://supabase.com).
2. Copy the connection string:
   ```
   postgresql://[user]:[password]@[host]/[dbname]?sslmode=require
   ```

### Step 2: Switch Prisma Schema for PostgreSQL
Copy the provided PostgreSQL schema:
```bash
cp prisma/schema.postgresql.prisma prisma/schema.prisma
```

### Step 3: Configure Environment Variables
Set the following environment variables in your deployment dashboard:
- `DATABASE_URL`: Your PostgreSQL connection string.
- `JWT_SECRET`: A high-entropy random string (e.g. 64 characters).
- `NEXT_PUBLIC_APP_URL`: Your public domain (e.g. `https://lahoreeliteschool.vercel.app`).
- `NEXT_PUBLIC_SCHOOL_NAME`: `Lahore Elite School`
- `NEXT_PUBLIC_CAMPUS_PHONE`: `0300-4279059`

### Step 4: Run Migrations & Seed
In the deployment build step or via terminal:
```bash
npx prisma db push
npm run prisma:seed
```

### Step 5: Build
```bash
npm run build
```
