# Frontend Deployment Checklist (Backend Already Deployed)

## ✅ Pre-Deployment Checklist

### 1. Get Your Backend URL
- Go to your Railway backend project
- Copy the public URL (e.g., `https://your-backend.railway.app`)

### 2. Verify Backend Environment Variables
Make sure your backend has these set:
- ✅ `MONGO_URI` - MongoDB connection
- ✅ `JWT_SECRET` - Secret key
- ✅ `FRONTEND_URL` - Will update this after frontend deployment
- ✅ `NODE_ENV=production`

---

## 🚀 Deploy Frontend to Railway

### Step 1: Create New Railway Project
1. Go to [Railway Dashboard](https://railway.app/dashboard)
2. Click **"New Project"**
3. Select **"Deploy from GitHub repo"** (recommended) or **"Empty Project"**

### Step 2: Configure Project
1. Select your repository
2. Set **Root Directory**: `project-management-frontend`
3. Railway will auto-detect it's a Vite project

### Step 3: Add Environment Variable
In Railway dashboard, add:
```
VITE_API_URL=https://your-backend-url.railway.app/api
```
⚠️ **Important**: Replace `your-backend-url` with your actual backend URL

### Step 4: Deploy
1. Click **"Deploy"**
2. Wait for build to complete (2-3 minutes)
3. Copy your frontend URL (e.g., `https://your-frontend.railway.app`)

### Step 5: Update Backend CORS
1. Go back to your **backend Railway project**
2. Add/Update environment variable:
   ```
   FRONTEND_URL=https://your-frontend.railway.app
   ```
3. Backend will automatically redeploy

---

## 🧪 Test Your Deployment

1. Visit your frontend URL
2. Try to **Sign Up** a new account
3. **Login** with your credentials
4. Create a **Project**
5. Create a **Task**

If everything works, you're done! 🎉

---

## 🐛 Common Issues & Fixes

### Issue: CORS Error
**Solution**: 
- Ensure `FRONTEND_URL` in backend matches your frontend URL exactly
- No trailing slash in URLs
- Restart backend service after updating

### Issue: API Connection Failed
**Solution**:
- Check `VITE_API_URL` has `/api` at the end
- Verify backend is running (visit backend URL in browser)
- Check browser console for exact error

### Issue: Build Failed
**Solution**:
- Check Railway build logs
- Ensure all dependencies are in `package.json`
- Try: Clear build cache in Railway settings

### Issue: White Screen After Deploy
**Solution**:
- Check browser console for errors
- Verify `VITE_API_URL` is set correctly
- Check if backend is accessible

---

## 📝 Quick Reference

### Your URLs (Fill these in):
- **Backend URL**: `https://_____________________.railway.app`
- **Frontend URL**: `https://_____________________.railway.app`

### Environment Variables:

**Backend** (already set):
```env
MONGO_URI=mongodb+srv://...
JWT_SECRET=your_secret
FRONTEND_URL=https://your-frontend.railway.app
NODE_ENV=production
```

**Frontend** (set this now):
```env
VITE_API_URL=https://your-backend.railway.app/api
```

---

## 🔄 Alternative: Deploy Frontend to Vercel

If Railway doesn't work, try Vercel:

1. Go to [Vercel](https://vercel.com)
2. Import your GitHub repo
3. Set **Root Directory**: `project-management-frontend`
4. Add environment variable: `VITE_API_URL=https://your-backend.railway.app/api`
5. Deploy
6. Update backend `FRONTEND_URL` with Vercel URL

---

## 📞 Need Help?

Check the full guide: [RAILWAY_DEPLOYMENT.md](./RAILWAY_DEPLOYMENT.md)
