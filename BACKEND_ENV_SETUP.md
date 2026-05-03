# ⚠️ CRITICAL: Backend Environment Variables Missing

## Your Backend is Missing Required Variables!

Currently your backend only has `FRONTEND_URL`, but it needs MORE variables to work.

---

## 🎯 Add These to Backend Railway Project NOW

Go to: https://railway.app/dashboard → Backend Project → Variables

### Required Variables:

#### 1. MONGO_URI (CRITICAL - Database Connection)
```
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/project_manager?retryWrites=true&w=majority
```

**Where to get this:**
- If using MongoDB Atlas: Go to Atlas → Clusters → Connect → Connect your application → Copy connection string
- If using Railway MongoDB Plugin: Railway auto-creates this as `MONGO_URL`, copy it to `MONGO_URI`

#### 2. JWT_SECRET (CRITICAL - Authentication)
```
JWT_SECRET=your_super_secret_random_string_here_12345
```

**Use any random string**, for example:
- `my_secret_key_lumina_2024`
- `lumina_jwt_secret_production_key`
- Any random text you want

#### 3. FRONTEND_URL (Already Set ✅)
```
FRONTEND_URL=https://lumina-production-ab49.up.railway.app
```

#### 4. NODE_ENV (Optional but Recommended)
```
NODE_ENV=production
```

---

## 📋 Step-by-Step Instructions

### Step 1: Get MongoDB Connection String

**Option A: Using Railway MongoDB Plugin**
1. In your backend Railway project
2. Click **"New"** → **"Database"** → **"Add MongoDB"**
3. Railway creates a `MONGO_URL` variable automatically
4. Copy the value of `MONGO_URL`
5. Create new variable `MONGO_URI` with the same value

**Option B: Using MongoDB Atlas (Free)**
1. Go to https://www.mongodb.com/cloud/atlas
2. Sign up / Login
3. Create a **Free Cluster** (M0)
4. Click **"Connect"**
5. Choose **"Connect your application"**
6. Copy the connection string
7. Replace `<password>` with your database password
8. Replace `<dbname>` with `project_manager`

Example:
```
mongodb+srv://myuser:mypassword@cluster0.xxxxx.mongodb.net/project_manager?retryWrites=true&w=majority
```

### Step 2: Add Variables to Railway

1. Go to Railway Dashboard
2. Open your **backend project** (lumina-production-8f2d)
3. Click **"Variables"** tab
4. Click **"New Variable"**
5. Add each variable:

**Add MONGO_URI:**
- Variable: `MONGO_URI`
- Value: `your_mongodb_connection_string`

**Add JWT_SECRET:**
- Variable: `JWT_SECRET`
- Value: `lumina_secret_key_2024` (or any random string)

**Add NODE_ENV:**
- Variable: `NODE_ENV`
- Value: `production`

6. Click **"Save"** or **"Add"** for each

### Step 3: Wait for Redeploy

Railway will automatically redeploy your backend (takes 2-3 minutes)

### Step 4: Test

Visit: https://lumina-production-8f2d.up.railway.app/

Should show: **"API is running 🚀"**

Then test signup: https://lumina-production-ab49.up.railway.app/

---

## 🚨 Why It's Not Working

Your backend needs:
1. ❌ **MONGO_URI** - To connect to database (MISSING!)
2. ❌ **JWT_SECRET** - To create login tokens (MISSING!)
3. ✅ **FRONTEND_URL** - For CORS (Already set)

Without MONGO_URI and JWT_SECRET, the backend cannot:
- Store user accounts
- Authenticate users
- Create projects/tasks

---

## 🎯 Quick Setup (Copy-Paste Ready)

If you want to use Railway MongoDB Plugin:

1. Add MongoDB plugin to backend project
2. Copy the `MONGO_URL` value
3. Add these variables:

```
MONGO_URI=<paste_the_MONGO_URL_value_here>
JWT_SECRET=lumina_production_secret_key_2024
NODE_ENV=production
FRONTEND_URL=https://lumina-production-ab49.up.railway.app
```

---

## ✅ Final Check

After adding variables, your backend should have:

- [x] MONGO_URI
- [x] JWT_SECRET  
- [x] FRONTEND_URL
- [x] NODE_ENV

Then test signup/login!

---

## 📞 Still Not Working?

Check backend logs:
1. Railway Dashboard → Backend Project
2. Deployments → Latest
3. View Logs
4. Look for errors

Common errors:
- "MONGO_URI is not defined" → Add MONGO_URI variable
- "JWT_SECRET is not defined" → Add JWT_SECRET variable
- "MongoServerError" → Check MongoDB connection string
