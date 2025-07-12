# 🚀 Employee Attendance Dashboard 2025

A modern, full-stack employee attendance tracking system built with React, Node.js, Firebase, and MongoDB.

## ✨ Features

### 👨‍💼 Employee Features
- **Clock In/Out** - Track work hours with precise timestamps
- **Break Management** - Separate lunch and snack break tracking
- **Real-time Dashboard** - Live status updates and time tracking
- **Activity Log** - Detailed view of daily activities
- **Time Summary** - Daily work time, break time, and net work calculations

### 👩‍💼 Admin Features
- **Employee Management** - View all registered employees
- **Attendance Reports** - Comprehensive attendance tracking and analytics
- **Data Export** - Export attendance data to CSV
- **Statistics Dashboard** - Overview of work hours, attendance patterns
- **Filtering & Search** - Filter by employee, date range, and more

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS, Vite
- **Backend**: Node.js, Express.js, MongoDB, Mongoose
- **Authentication**: Firebase Authentication
- **Database**: MongoDB Atlas
- **Deployment**: Vercel (Frontend & Backend)
- **Icons**: Lucide React
- **Date Handling**: date-fns

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- Firebase Account
- MongoDB Atlas Account

### Setup Instructions

1. **Download the project files**
2. **Follow the complete setup guide**: Open `SETUP_GUIDE.md` for detailed step-by-step instructions
3. **Configure Firebase and MongoDB** as described in the setup guide
4. **Install dependencies and run the application**

## 📖 Documentation

- **[SETUP_GUIDE.md](./SETUP_GUIDE.md)** - Complete setup instructions from scratch
- **[DEPLOYMENT.md](./DEPLOYMENT.md)** - Production deployment guide for Vercel

## 🧪 Demo Accounts

The application includes built-in demo accounts for testing:

**Employee Account:**
- Email: `employee@demo.com`
- Password: `password123`

**Admin Account:**
- Email: `admin@demo.com`
- Password: `admin123`

## 🏗️ Project Structure

```
attendance-dashboard/
├── src/                    # Frontend source code
│   ├── components/         # Reusable React components
│   ├── contexts/          # React Context providers
│   ├── pages/             # Page components
│   ├── config/            # Configuration files
│   └── firebase/          # Firebase configuration
├── backend/               # Backend source code
│   ├── models/            # MongoDB models
│   ├── routes/            # API routes
│   └── server.js          # Express server
├── SETUP_GUIDE.md         # Complete setup instructions
├── DEPLOYMENT.md          # Deployment guide
└── README.md              # This file
```

## 🔧 Development

### Running Locally

1. **Start Backend Server:**
   ```bash
   cd backend
   npm start
   ```

2. **Start Frontend (new terminal):**
   ```bash
   npm run dev
   ```

3. **Open browser:** `http://localhost:5173`

### Environment Variables

Create `.env` files as described in `SETUP_GUIDE.md`:
- Frontend: `.env` (Firebase config, API URL)
- Backend: `backend/.env` (MongoDB URI, CORS settings)

## 🌐 Production Deployment

The project is configured for separate frontend and backend deployment on Vercel. See `DEPLOYMENT.md` for complete instructions.

## 📱 Responsive Design

- **Mobile-first approach** with Tailwind CSS
- **Responsive breakpoints** for all screen sizes
- **Touch-friendly interface** for mobile devices
- **Progressive Web App** capabilities

## 🔒 Security Features

- **Firebase Authentication** with email/password
- **Role-based access control** (Employee/Admin)
- **CORS protection** for API endpoints
- **Environment variable protection** for sensitive data
- **Input validation** and sanitization

## 🎨 UI/UX Features

- **Modern gradient design** with professional aesthetics
- **Smooth animations** and micro-interactions
- **Loading states** and error handling
- **Intuitive navigation** and user feedback
- **Consistent design system** with Tailwind CSS

## 📊 Analytics & Reporting

- **Time tracking accuracy** down to the minute
- **Break time calculations** (lunch and snack breaks)
- **Net work time computation** (total work - break time)
- **CSV export functionality** for external analysis
- **Monthly and custom date range filtering**

## 🔄 Real-time Features

- **Live clock** display on dashboard
- **Real-time status updates** (working, on break, etc.)
- **Automatic time calculations** as activities occur
- **Instant UI feedback** for all user actions

## 🛡️ Error Handling

- **Comprehensive error messages** for user guidance
- **Network error detection** and user notification
- **Firebase configuration validation**
- **Backend connectivity monitoring**
- **Graceful fallbacks** for offline scenarios

## 📈 Performance

- **Optimized bundle size** with Vite
- **Lazy loading** for better initial load times
- **Efficient API calls** with proper caching
- **Responsive images** and assets
- **Production-ready builds**

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

If you encounter any issues:

1. Check the `SETUP_GUIDE.md` for detailed instructions
2. Verify your Firebase and MongoDB configurations
3. Ensure all environment variables are set correctly
4. Check that both frontend and backend servers are running

## 🎉 Success Stories

This attendance dashboard has been designed for:
- **Small to medium businesses** tracking employee hours
- **Remote teams** needing flexible time tracking
- **Companies** requiring detailed attendance reports
- **Organizations** wanting modern, user-friendly interfaces

---

**Built with ❤️ for modern workforce management in 2025**