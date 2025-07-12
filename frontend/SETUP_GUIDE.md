# 🚀 Employee Attendance Dashboard - Complete Setup Guide 2025

This guide will walk you through setting up the Employee Attendance Dashboard from scratch.

## 📋 Prerequisites

Before starting, make sure you have:
- **Node.js** (version 18 or higher) - [Download here](https://nodejs.org/)
- **Git** - [Download here](https://git-scm.com/)
- **Code Editor** (VS Code recommended) - [Download here](https://code.visualstudio.com/)

## 🔥 Step 1: Firebase Setup

### 1.1 Create Firebase Project
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Create a project"
3. Enter project name: `attendance-dashboard-2025`
4. Disable Google Analytics (optional)
5. Click "Create project"

### 1.2 Enable Authentication
1. In Firebase Console, go to **Authentication**
2. Click **Get started**
3. Go to **Sign-in method** tab
4. Click on **Email/Password**
5. **Enable** the first option (Email/Password)
6. Click **Save**

### 1.3 Get Firebase Configuration
1. Go to **Project Settings** (gear icon)
2. Scroll down to **Your apps**
3. Click **Web app** icon (`</>`)
4. Enter app name: `attendance-frontend`
5. Click **Register app**
6. **Copy the config object** - you'll need this later!

Example config (yours will be different):
```javascript
const firebaseConfig = {
  apiKey: "AIzaSyC...",
  authDomain: "attendance-dashboard-2025.firebaseapp.com",
  projectId: "attendance-dashboard-2025",
  storageBucket: "attendance-dashboard-2025.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef123456"
};
```

## 🗄️ Step 2: MongoDB Setup

### 2.1 Create MongoDB Atlas Account
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Click **Try Free**
3. Create account or sign in
4. Create a **Free Cluster**

### 2.2 Configure Database
1. Choose **AWS** as cloud provider
2. Select **Free tier** (M0 Sandbox)
3. Choose region closest to you
4. Click **Create Cluster**

### 2.3 Create Database User
1. Go to **Database Access**
2. Click **Add New Database User**
3. Choose **Password** authentication
4. Username: `attendanceUser`
5. Password: Generate secure password (save it!)
6. Database User Privileges: **Read and write to any database**
7. Click **Add User**

### 2.4 Configure Network Access
1. Go to **Network Access**
2. Click **Add IP Address**
3. Click **Allow Access from Anywhere** (for development)
4. Click **Confirm**

### 2.5 Get Connection String
1. Go to **Clusters**
2. Click **Connect** on your cluster
3. Choose **Connect your application**
4. Copy the connection string
5. Replace `<password>` with your database user password

Example: `mongodb+srv://attendanceUser:yourpassword@cluster0.abcde.mongodb.net/attendance?retryWrites=true&w=majority`

## 💻 Step 3: Project Setup

### 3.1 Download and Extract Project
1. Download the project files
2. Extract to a folder like `attendance-dashboard`
3. Open terminal/command prompt
4. Navigate to project folder: `cd attendance-dashboard`

### 3.2 Install Frontend Dependencies
```bash
npm install
```

### 3.3 Install Backend Dependencies
```bash
cd backend
npm install
cd ..
```

### 3.4 Configure Environment Variables

#### Frontend Configuration
1. Open the `.env` file in the root directory
2. Replace the Firebase configuration with your values:

```env
# Frontend Environment Variables
VITE_API_URL=http://localhost:3001

# Replace these with your Firebase config values
VITE_FIREBASE_API_KEY=AIzaSyC...
VITE_FIREBASE_AUTH_DOMAIN=your-project-id.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project-id.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123456789:web:abcdef123456
VITE_FIREBASE_MEASUREMENT_ID=G-ABCDEF123456
```

#### Backend Configuration
1. Open the `backend/.env` file
2. Replace the MongoDB URI with your connection string:

```env
# Backend Environment Variables
PORT=3001
NODE_ENV=development

# Replace with your MongoDB connection string
MONGODB_URI=mongodb+srv://attendanceUser:yourpassword@cluster0.abcde.mongodb.net/attendance?retryWrites=true&w=majority

# Frontend URL for CORS
FRONTEND_URL=http://localhost:5173
```

## 🚀 Step 4: Run the Application

### 4.1 Start Backend Server
Open a terminal and run:
```bash
cd backend
npm start
```

You should see:
```
Server is running on port 3001
MongoDB connected successfully
```

### 4.2 Start Frontend (New Terminal)
Open a **new terminal** and run:
```bash
npm run dev
```

You should see:
```
Local:   http://localhost:5173/
```

### 4.3 Open Application
1. Open your browser
2. Go to `http://localhost:5173`
3. You should see the login page

## 🧪 Step 5: Test the Application

### 5.1 Demo Accounts
The application comes with built-in demo accounts:

**Employee Account:**
- Email: `employee@demo.com`
- Password: `password123`

**Admin Account:**
- Email: `admin@demo.com`
- Password: `admin123`

### 5.2 Test Login
1. Click **"Login as Employee"** button
2. You should be redirected to the employee dashboard
3. Try clocking in/out and taking breaks
4. Logout and try **"Login as Admin"** button
5. You should see the admin dashboard with reports

## 🔧 Troubleshooting

### Common Issues:

#### 1. Firebase Authentication Error
**Error:** `Firebase: Error (auth/invalid-credential)`
**Solution:** 
- Make sure Email/Password authentication is enabled in Firebase Console
- Check that your Firebase config values are correct in `.env`

#### 2. Backend Connection Error
**Error:** `Failed to fetch` or `ECONNREFUSED`
**Solution:**
- Make sure backend server is running (`npm start` in backend folder)
- Check that MongoDB connection string is correct
- Verify MongoDB Atlas network access allows your IP

#### 3. CORS Error
**Error:** `Access to fetch blocked by CORS policy`
**Solution:**
- Make sure `FRONTEND_URL` in backend `.env` matches your frontend URL
- Restart backend server after changing environment variables

#### 4. Environment Variables Not Loading
**Solution:**
- Make sure `.env` files are in the correct locations
- Restart both frontend and backend servers
- Check that variable names start with `VITE_` for frontend

### 5. MongoDB Connection Issues
**Error:** `MongoNetworkError` or connection timeout
**Solution:**
- Check your internet connection
- Verify MongoDB Atlas cluster is running
- Make sure IP address is whitelisted in Network Access
- Check username/password in connection string

## 📱 Features Available

Once setup is complete, you'll have access to:

### Employee Features:
- ✅ Clock in/out functionality
- ✅ Lunch break tracking
- ✅ Snack break tracking
- ✅ Daily time summary
- ✅ Activity log
- ✅ Real-time status updates

### Admin Features:
- ✅ View all employees
- ✅ Attendance reports
- ✅ Filter by month/employee
- ✅ Export data to CSV
- ✅ Statistics dashboard
- ✅ Real-time attendance monitoring

## 🌐 Production Deployment (Vercel)

For production deployment on Vercel, see the `DEPLOYMENT.md` file for detailed instructions.

## 📞 Support

If you encounter any issues:

1. **Check the browser console** for error messages
2. **Check terminal outputs** for backend errors
3. **Verify all environment variables** are set correctly
4. **Ensure Firebase and MongoDB** are properly configured
5. **Make sure both servers are running** simultaneously

## 🎉 Success!

If everything is working correctly, you should be able to:
- Login with demo accounts
- Navigate between employee and admin dashboards
- Track attendance and breaks
- View reports and export data

Your Employee Attendance Dashboard is now ready for use in 2025! 🚀