// import express from 'express';
// import cors from 'cors';
// import mongoose from 'mongoose';
// import dotenv from 'dotenv';
// import userRoutes from './routes/userRoutes.js';
// import attendanceRoutes from './routes/attendanceRoutes.js';
// import adminRoutes from './routes/adminRoutes.js';

// dotenv.config();

// const app = express();
// const PORT = process.env.PORT || 4001;

// // CORS configuration for production
// const corsOptions = {
//   origin: process.env.NODE_ENV === 'production' 
//     ? [process.env.FRONTEND_URL, 'https://employee-management-bzh3-da8ag1cnj-sumans-projects-cc85c3c0.vercel.app']
//     : ['http://localhost:5173', 'http://localhost:3000'],
//   credentials: true,
//   methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
//   allowedHeaders: ['Content-Type', 'Authorization']
// };

// // Middleware
// app.use(cors(corsOptions));
// app.use(express.json());

// // MongoDB connection
// const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://Sourav:Qwerty123@cluster0.ucr87hz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

// mongoose.connect(MONGODB_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// })
// .then(() => console.log('MongoDB connected successfully'))
// .catch((error) => console.error('MongoDB connection error:', error));

// // Routes
// app.use('/api/users', userRoutes);
// app.use('/api/attendance', attendanceRoutes);
// app.use('/api/admin', adminRoutes);

// // Health check endpoint
// // app.get('/health', (req, res) => {
//   app.get('/api/health', (req, res) => {
//   res.json({ 
//     status: 'OK', 
//     timestamp: new Date().toISOString(),
//     environment: process.env.NODE_ENV || 'development'
//   });
// });

// // Root endpoint
// app.get('/', (req, res) => {
//   res.json({ 
//     message: 'Employee Attendance Dashboard API',
//     version: '1.0.0',
//     status: 'running'
//   });
// });

// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
//   console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
// });





// import express from 'express';
// import cors from 'cors';
// import mongoose from 'mongoose';
// import dotenv from 'dotenv';
// import userRoutes from './routes/userRoutes.js';
// import attendanceRoutes from './routes/attendanceRoutes.js';
// import adminRoutes from './routes/adminRoutes.js';
// // import Base from './routes/Base.js';     //ye change hua avi

// dotenv.config();

// const app = express();

// // CORS configuration
// const corsOptions = {
//   origin: process.env.NODE_ENV === 'production'
//     ? [process.env.FRONTEND_URL, 'https://your-frontend-app.vercel.app']
//     : ['http://localhost:5173', 'http://localhost:3000'],
//   credentials: true,
//   methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
//   allowedHeaders: ['Content-Type', 'Authorization']
// };

// app.use(cors(corsOptions));
// app.use(express.json());

// // MongoDB connection
// const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://Sourav:Qwerty123@cluster0.ucr87hz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

// mongoose.connect(MONGODB_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// })
// .then(() => console.log('MongoDB connected successfully'))
// .catch((error) => console.error('MongoDB connection error:', error));

// // // API routes
// // app.use('', Base);       // or ye
// app.use('/api/users', userRoutes);
// app.use('/api/attendance', attendanceRoutes);
// app.use('/api/admin', adminRoutes);

// // Health check route
// app.get('/health', (req, res) => {
//   res.json({ 
//     status: 'OK', 
//     timestamp: new Date().toISOString(),
//     environment: process.env.NODE_ENV || 'development'
//   });
// });

// // Root route
// app.get('/', (req, res) => {
//   res.json({ 
//     message: 'Employee Attendance Dashboard API',
//     version: '1.0.0',
//     status: 'running'
//   });
// });

// // ❌ Do NOT use app.listen() in Vercel serverless
// // app.listen(PORT, () => {
// //   console.log(`Server is running on port ${PORT}`);
// //   console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
// // });

// // ✅ Vercel needs a default export of the app
// export default app;



import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes.js';
import attendanceRoutes from './routes/attendanceRoutes.js';
import adminRoutes from './routes/adminRoutes.js';

dotenv.config();

const app = express();

// ✅ CORS Configuration
const corsOptions = {
  origin:
    process.env.NODE_ENV === 'production'
      ? [process.env.FRONTEND_URL, 'https://employee-management-bzh3.vercel.app']
      : ['http://localhost:5173', 'http://localhost:3001'],                                //yha 3000 tha
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));
app.use(express.json());

// ✅ MongoDB Connection (only once in serverless)
const MONGODB_URI = process.env.MONGODB_URI;
let isConnected = false;

if (!isConnected) {
  mongoose
    .connect(MONGODB_URI)
    .then(() => {
      isConnected = true;
      console.log('MongoDB connected');
    })
    .catch((err) => console.error('MongoDB connection error:', err));
}

// ✅ API Routes
app.use('https://employee-management-bzh3.vercel.app/api/users', userRoutes);
app.use('https://employee-management-bzh3.vercel.app/api/attendance', attendanceRoutes);
app.use('https://employee-management-bzh3.vercel.app/api/attendance/api/admin', adminRoutes);

// ✅ Health Check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
  });
});

// ✅ Root Info
app.get('/', (req, res) => {
  res.json({
    message: 'Employee Attendance Dashboard API',
    version: '1.0.0',
    status: 'running',
  });
});

// ✅ Export Express app (for Vercel serverless functions)
export default app;
