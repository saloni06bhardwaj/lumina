# ⚡ Final Setup Instructions

## Your Deployed URLs

- **Frontend**: https://lumina-production-ab49.up.railway.app/
- **Backend**: https://lumina-production-8f2d.up.railway.app/

---

## 🎯 Action Required (2 Steps)

### Step 1: Update Backend Environment Variable

1. Go to Railway Dashboard: https://railway.app/dashboard
2. Open your **backend** project (lumina-production-8f2d)
3. Click **Variables** tab
4. Add or update:
   ```
   FRONTEND_URL=https://lumina-production-ab49.up.railway.app
   ```
5. Click **Save** (Railway will auto-redeploy)

### Step 2: Update Frontend Environment Variable

1. Go to Railway Dashboard: https://railway.app/dashboard
2. Open your **frontend** project (lumina-production-ab49)
3. Click **Variables** tab
4. Add or update:
   ```
   VITE_API_URL=https://lumina-production-8f2d.up.railway.app/api
   ```
5. Click **Save** (Railway will auto-redeploy)

---

## ⏱️ Wait 2-3 Minutes

Both services will redeploy automatically after updating environment variables.

---

## ✅ Test Your Application

Visit: **https://lumina-production-ab49.up.railway.app/**

1. **Sign Up** - Create a new account
2. **Login** - Use your credentials
3. **Create Project** - Test project creation
4. **Create Task** - Test task creation

---

## 🎉 You're Done!

Your Lumina Project Management System is now live and ready to use!

---

## 📞 Need Help?

Check the troubleshooting section in [DEPLOYMENT_STATUS.md](./DEPLOYMENT_STATUS.md)
