# GymAPI — Full Architecture Plan

## 1. Overview

A platform where customers buy a plan, get an API key, and use it in their website to fetch gym illustration images hosted on your CDN.

---

## 2. Tech Stack

| Layer | Technology | Why |
|-------|-----------|-----|
| Framework | Next.js 14 (App Router) | One codebase = frontend + API, deploys to Vercel |
| Language | TypeScript | Catches bugs at build time |
| Database | Supabase (PostgreSQL) | Free tier, built-in auth, Row Level Security |
| Image Storage | Cloudflare R2 | Free for your size, global CDN |
| Payments | StreamPay (manual flow) | Explained below |
| Styling | Tailwind CSS + shadcn/ui | Fast, clean UI |
| Email | Resend.com | Free 3000 emails/month — send API key after approval |
| Deployment | Vercel | Free, auto-deploys from GitHub |

---

## 3. System Layers

```
┌─────────────────────────────────────────────────────────┐
│                  CUSTOMER'S WEBSITE                      │
│   fetch('/api/v1/images/bench-press', {                  │
│     headers: { 'x-api-key': 'gim_xxxxxxxx' }            │
│   })                                                     │
└────────────────────┬────────────────────────────────────┘
                     │ HTTPS
┌────────────────────▼────────────────────────────────────┐
│                YOUR NEXT.JS APP (Vercel)                  │
│                                                          │
│  ┌─────────────┐  ┌──────────────┐  ┌───────────────┐   │
│  │  Marketing  │  │  Dashboard   │  │  Admin Panel  │   │
│  │  /pricing   │  │  /dashboard  │  │  /admin       │   │
│  │  /docs      │  │  (customer)  │  │  (you only)   │   │
│  └─────────────┘  └──────────────┘  └───────────────┘   │
│                                                          │
│  ┌──────────────────────────────────────────────────┐    │
│  │              IMAGE API  /api/v1/images           │    │
│  │  1. Validate API key                             │    │
│  │  2. Check usage limit                            │    │
│  │  3. Increment usage count                        │    │
│  │  4. Return image CDN URL                         │    │
│  └──────────────────────────────────────────────────┘    │
└────────┬──────────────────────────────────┬─────────────┘
         │                                  │
┌────────▼────────┐               ┌─────────▼──────────┐
│    SUPABASE     │               │   CLOUDFLARE R2    │
│  (PostgreSQL)   │               │   cdn.gymapi.com   │
│  - users        │               │   /men/*.png       │
│  - api_keys     │               │   /women/*.png     │
│  - payments     │               └────────────────────┘
│  - images       │
│  - plans        │
└─────────────────┘
```

---

## 4. Database Schema

```sql
-- Subscription plans you sell
plans
  id, name, price_sar, monthly_limit,
  image_access ('men' | 'women' | 'both'), is_active

-- Customer accounts (Supabase Auth handles passwords)
profiles
  id, email, full_name, role ('customer' | 'admin'), created_at

-- API keys issued to customers
api_keys
  id, user_id, key_hash,       -- key stored HASHED (SHA-256)
  key_prefix,                  -- first 8 chars shown in dashboard
  plan_id, status ('pending' | 'active' | 'suspended'),
  monthly_limit, calls_this_month, calls_reset_at,
  created_at, expires_at

-- Payment records
payments
  id, user_id, plan_id, amount_sar,
  status ('pending' | 'approved' | 'rejected'),
  streampay_transaction_id,    -- customer submits this manually
  created_at, approved_at

-- Your 80 images catalog
images
  id, slug,                    -- e.g. "bench-press"
  name_en, gender ('men' | 'women'),
  muscle_group,                -- "chest", "back", etc.
  cdn_url,                     -- full Cloudflare R2 URL
  is_active, sort_order
```

---

## 5. Payment Flow (StreamPay Manual)

Since StreamPay has no documented public API, this is the safest reliable flow:

```
1. Customer picks a plan → registers account
2. Sees StreamPay payment instructions + your payment link
3. Pays via StreamPay → StreamPay shows them a Transaction ID
4. Customer comes back → submits their Transaction ID on your site
5. Status shows "Pending Verification"
6. You (admin) open /admin → see the pending payment → verify manually in StreamPay dashboard → click Approve
7. System auto-generates API key → emails it to customer → key goes live
```

If StreamPay later gives you a webhook URL feature, step 6-7 becomes fully automatic.

---

## 6. The API (What Your Customers Use)

**List all images:**
```
GET /api/v1/images?gender=men
x-api-key: gim_xxxxxxxxxxxxxxxx

Response:
{
  "success": true,
  "data": [
    { "id": "bench-press", "name": "Bench Press", "muscle_group": "chest", "url": "https://cdn.gymapi.com/men/bench-press.png" },
    { "id": "squat", "name": "Squat", "muscle_group": "legs", "url": "..." },
    ...
  ],
  "usage": { "calls_this_month": 42, "limit": 500 }
}
```

**Get one image:**
```
GET /api/v1/images/bench-press?gender=men
x-api-key: gim_xxxxxxxxxxxxxxxx

Response:
{
  "success": true,
  "data": {
    "id": "bench-press",
    "name": "Bench Press",
    "gender": "men",
    "muscle_group": "chest",
    "url": "https://cdn.gymapi.com/men/bench-press.png"
  }
}
```

**Error responses:**
```
401 → { "error": "Invalid API key" }
429 → { "error": "Monthly limit reached. Upgrade your plan." }
404 → { "error": "Image not found" }
403 → { "error": "Your plan does not include women images" }
```

---

## 7. Folder Structure

```
gymapi/
├── app/
│   ├── (marketing)/
│   │   ├── page.tsx              ← Landing page
│   │   ├── pricing/page.tsx      ← Plans + buy buttons
│   │   └── docs/page.tsx         ← API documentation for customers
│   ├── (auth)/
│   │   ├── login/page.tsx
│   │   └── register/page.tsx
│   ├── dashboard/
│   │   ├── page.tsx              ← Customer sees API key + usage
│   │   └── payment/page.tsx      ← Submit StreamPay transaction ID
│   ├── admin/
│   │   ├── page.tsx              ← Overview stats
│   │   ├── payments/page.tsx     ← Pending approvals (main admin job)
│   │   └── customers/page.tsx    ← All customers
│   └── api/
│       ├── v1/
│       │   └── images/
│       │       ├── route.ts          ← GET /api/v1/images
│       │       └── [slug]/route.ts   ← GET /api/v1/images/:slug
│       ├── payment/
│       │   └── submit/route.ts       ← Customer submits transaction ID
│       └── admin/
│           └── approve/route.ts      ← Admin approves payment → creates key
├── lib/
│   ├── supabase/
│   │   ├── client.ts             ← Browser Supabase client
│   │   └── server.ts             ← Server Supabase client
│   ├── api-key.ts                ← Key generation + hashing + validation
│   ├── r2.ts                     ← Cloudflare R2 client
│   └── email.ts                  ← Resend email sender
├── middleware.ts                  ← Protects /dashboard and /admin routes
├── components/
│   ├── ui/                       ← shadcn/ui base components
│   ├── marketing/                ← Landing page sections
│   ├── dashboard/                ← Customer dashboard components
│   └── admin/                    ← Admin panel components
└── supabase/
    └── migrations/
        └── 001_initial_schema.sql
```

---

## 8. Pricing Plans (Suggested)

| Plan | Price (SAR) | Images | Calls/month |
|------|-------------|--------|-------------|
| Men | 49 SAR | 40 men images | 1,000 |
| Women | 49 SAR | 40 women images | 1,000 |
| Full | 89 SAR | 80 images (both) | 2,000 |
| Pro | 149 SAR | 80 images (both) | 10,000 |

---

## 9. Security Design

- API keys stored **hashed** (SHA-256) in DB — raw key shown to customer only once
- API key format: `gim_live_` + 32 random characters
- Row Level Security on all Supabase tables
- Admin role checked in Next.js middleware — `/admin` is hard-blocked for non-admins
- API routes have CORS open (needed — customers call from their own domains)
- Usage counter incremented atomically to prevent race conditions

---

## 10. Build Order (Phases)

```
Phase 1 — Foundation
  ✦ Supabase project + DB schema + migrations
  ✦ Next.js project setup + Tailwind + shadcn/ui
  ✦ Supabase Auth (login/register)
  ✦ Middleware (protect dashboard + admin)

Phase 2 — The API (core product)
  ✦ Image catalog seeded in DB
  ✦ Cloudflare R2 bucket configured
  ✦ GET /api/v1/images + GET /api/v1/images/:slug
  ✦ API key validation middleware
  ✦ Usage counting + limit enforcement

Phase 3 — Payment Flow
  ✦ Pricing page
  ✦ Customer submits StreamPay transaction ID
  ✦ Admin panel: view + approve pending payments
  ✦ On approval: generate API key + send email via Resend

Phase 4 — Customer Dashboard
  ✦ View API key (masked + reveal button)
  ✦ Usage stats (calls used / limit)
  ✦ Copy-paste code examples

Phase 5 — Marketing + Docs
  ✦ Landing page
  ✦ Documentation page (API reference for customers)
  ✦ Image browser (show all 80 images with slugs)
```

---

## 11. Prerequisites Checklist

Before execution, the following accounts and credentials are needed:

- [ ] **Supabase** — Project URL, anon key, service_role key
- [ ] **Cloudflare R2** — Account ID, Access Key ID, Secret Access Key, Bucket name
- [ ] **Resend.com** — API key
- [ ] **StreamPay** — Payment link URL (the link you send customers to pay)
- [ ] **GitHub** — Repo created
- [ ] **Vercel** — Account linked to GitHub
- [ ] **Node.js 18+** installed locally
- [ ] 80 images named in lowercase-with-hyphens format (e.g. `bench-press.png`)
