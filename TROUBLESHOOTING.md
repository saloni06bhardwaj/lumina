# 🔧 Troubleshooting Server Errors

## Current Issue: Server Error on Signup/Login

### Quick Fixes to Try on Railway

#### 1. Check Backend Logs
1. Go to Railway Dashboard
2. Open backend project (lumina-production-8f2d)
3. Click on **Deployments** tab
4. Click on latest deployment
5. Check **Logs** for errors

Common errors to look for:
- MongoDB connection failed
- JWT_SECRET not defined
- Port binding issues

#### 2. Verify Environment Variables

**Backend must have these set:**
```
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/dbname
JWT_SECRET=any_random_secret_string_here
FRONTEND_URL=https://lumina-production-ab49.up.railway.app
NODE_ENV=production
PORT=5000
```

**Frontend must have:**
```
VITE_API_URL=https://lumina-production-8f2d.up.railway.app/api
```

#### 3. Test Backend Directly

Visit: https://lumina-production-8f2d.up.railway.app/

Expected: "API is running 🚀"

If you see this, backend is running.

#### 4. Test API Endpoint

Try this in browser or Postman:
```
POST https://lumina-production-8f2d.up.railway.app/api/auth/signup
Content-Type: application/json

{
  "name": "Test User",
  "email": "test@example.com",
  "password": "password123",
  "role": "MEMBER"
}
```

#### 5. Common Issues & Solutions

**Issue: MongoDB Connection Error**
- Check MONGO_URI is correct
- Verify MongoDB Atlas allows Railway IP (0.0.0.0/0)
- Check database user has read/write permissions

**Issue: JWT_SECRET not defined**
- Add JWT_SECRET environment variable
- Use any random string (e.g., "my_super_secret_key_123")

**Issue: CORS Error**
- Backend CORS is now set to allow all origins (*)
- Redeploy backend after updating server.js

**Issue: 500 Internal Server Error**
- Check backend logs for exact error
- Verify all dependencies installed
- Check MongoDB connection

#### 6. Redeploy Backend

After fixing environment variables:
1. Go to backend Railway project
2. Click **Deployments** tab
3. Click **Redeploy** on latest deployment
OR
4. Make a small change and push to trigger redeploy

#### 7. Check MongoDB Atlas (if using)

1. Go to MongoDB Atlas dashboard
2. Click **Network Access**
3. Add IP: `0.0.0.0/0` (Allow from anywhere)
4. Click **Database Access**
5. Verify user has read/write permissions

---

## Updated Files

I've updated the backend CORS to allow all origins temporarily:

```javascript
app.use(cors({
    origin: '*',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
```

**You need to:**
1. Push this change to GitHub
2. Railway will auto-redeploy
3. Test again

---

## Manual Deployment Steps

If Railway auto-deploy isn't working:

### Backend
```bash
cd project-management-backend
git add .
git commit -m "Fix CORS and server configuration"
git push
```

### Frontend (if needed)
```bash
cd project-management-frontend
git add .
git commit -m "Update API configuration"
git push
```

---

## Test Checklist

After redeploying:

- [ ] Backend URL shows "API is running 🚀"
- [ ] Frontend loads without errors
- [ ] Browser console shows no CORS errors
- [ ] Signup form submits without error
- [ ] Can create account
- [ ] Can login

---

## Get Backend Logs

To see what's actually failing:

1. Railway Dashboard → Backend Project
2. Deployments → Latest Deployment
3. View Logs
4. Look for error messages

Share the error logs if you need more help!
