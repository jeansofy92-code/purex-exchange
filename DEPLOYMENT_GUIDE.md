# 🚀 PUREX Exchange - Free Online Deployment Guide (No Custom Domain Needed)

You do **NOT** need to buy a domain name. You can put PUREX Exchange live on the web with a **free HTTPS URL** and a **free cloud database** using 100% free tier services.

---

## 🎯 Architecture Options Overview

| Component | Recommended Free Provider | Free Tier Benefits | Free URL / Subdomain |
| :--- | :--- | :--- | :--- |
| **All-in-One Fullstack** | **[Render.com](https://render.com)** | Hosts both Vite Frontend + Express Backend together | `https://purex-exchange.onrender.com` |
| **Frontend Alternative** | **[Vercel](https://vercel.com)** | Ultra-fast global Edge CDN | `https://purex-exchange.vercel.app` |
| **Cloud Database** | **[Supabase](https://supabase.com)** | Managed PostgreSQL, real-time database, table editor | `https://[project-id].supabase.co` |

---

## 🌟 Option 1: Render.com (Recommended - 1 Click, Easiest)

Because we configured `server.js` to serve the compiled frontend (`dist/`) along with the API, you can deploy the entire exchange as **1 single free service**:

### Steps:
1. **Push your code to GitHub**:
   ```bash
   git init
   git add .
   git commit -m "feat: Purex Exchange fullstack application"
   git branch -M main
   git remote add origin https://github.com/your-username/purex-exchange.git
   git push -u origin main
   ```
2. **Sign up at [Render.com](https://render.com)** (Free).
3. Click **"New +"** $\rightarrow$ **"Web Service"**.
4. Connect your GitHub repository `purex-exchange`.
5. Render will automatically detect settings or fill in:
   - **Name**: `purex-exchange`
   - **Environment**: `Node`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `node server.js`
   - **Instance Type**: `Free`
6. Add Environment Variables (Optional):
   - `JWT_SECRET`: (e.g. `purex-production-jwt-secret-2026`)
   - `ADMIN_SECRET`: (e.g. `purex-admin-2026`)
   - `SUPABASE_URL`: (from your Supabase project)
   - `SUPABASE_KEY`: (from your Supabase project)
7. Click **"Create Web Service"**.
8. In ~2 minutes, your live site will be accessible at:
   `https://purex-exchange.onrender.com`

---

## 🗄️ Setting Up Free Database (Supabase)

1. Sign up for free at **[Supabase.com](https://supabase.com)**.
2. Click **"New Project"**, name it `purex-exchange`, and set a database password.
3. Open the **SQL Editor** tab from the left sidebar.
4. Copy the entire contents of [`schema.sql`](file:///c:/Users/HP/purex-exchange/schema.sql) and click **"Run"**.
   - This creates the `users`, `deposits`, `withdrawals`, `investments`, `investment_plans`, and `transactions` tables instantly.
5. Go to **Project Settings** $\rightarrow$ **API**:
   - Copy **Project URL** $\rightarrow$ paste into `SUPABASE_URL`
   - Copy **anon / public key** $\rightarrow$ paste into `SUPABASE_KEY`

---

## ⚡ Option 2: Split Vercel (Frontend) + Render (Backend)

If you prefer deploying the React frontend separately on Vercel:
1. Import the repository into **[Vercel](https://vercel.com)**.
2. Set Environment Variable:
   - `VITE_API_URL`: `https://purex-api.onrender.com`
3. Click **Deploy**. Vercel gives you `https://purex-exchange.vercel.app`.
