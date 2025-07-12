import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { LogIn, Mail, Lock, Clock, Users, AlertCircle, Server } from 'lucide-react';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login, userRole, currentUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser && userRole) {
      if (userRole === 'admin') {
        navigate('/admin');
      } else {
        navigate('/dashboard');
      }
    }
  }, [currentUser, userRole, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(email, password);
      // Navigation will be handled by useEffect
    } catch (error: any) {
      console.error('Login error:', error);
      setError(error.message || 'Failed to sign in. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = async (demoEmail: string, demoPassword: string) => {
    setEmail(demoEmail);
    setPassword(demoPassword);
    setError('');
    setLoading(true);

    try {
      await login(demoEmail, demoPassword);
      // Navigation will be handled by useEffect
    } catch (error: any) {
      console.error('Demo login error:', error);
      setError(error.message || 'Failed to sign in with demo account.');
    } finally {
      setLoading(false);
    }
  };

  const isFirebaseConfigError = error.includes('Firebase') || error.includes('authentication is not enabled');
  const isBackendError = error.includes('Unable to connect to the server') || error.includes('backend server');

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="mx-auto h-20 w-20 bg-gradient-to-br from-blue-500 to-teal-500 rounded-full flex items-center justify-center mb-6">
            <Clock className="h-10 w-10 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome Back
          </h2>
          <p className="text-gray-600">
            Sign in to your attendance dashboard
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
            {error && (
              <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start space-x-3">
                <AlertCircle className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
                <div className="text-red-700 text-sm">
                  <p className="font-medium mb-1">
                    {isFirebaseConfigError ? 'Firebase Configuration Error' : 
                     isBackendError ? 'Server Connection Error' : 'Authentication Error'}
                  </p>
                  <p>{error}</p>
                  {isFirebaseConfigError && (
                    <div className="mt-2 p-2 bg-red-100 rounded text-xs">
                      <p className="font-medium">To fix this:</p>
                      <ol className="list-decimal list-inside mt-1 space-y-1">
                        <li>Check the SETUP_GUIDE.md file</li>
                        <li>Follow Firebase setup instructions</li>
                        <li>Enable Email/Password authentication</li>
                        <li>Update your .env file with correct Firebase config</li>
                      </ol>
                    </div>
                  )}
                  {isBackendError && (
                    <div className="mt-2 p-2 bg-red-100 rounded text-xs flex items-start space-x-2">
                      <Server className="h-4 w-4 text-red-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-medium">Backend server is not running:</p>
                        <ol className="list-decimal list-inside mt-1 space-y-1">
                          <li>Open terminal and navigate to project folder</li>
                          <li>Navigate to backend folder: <code className="bg-red-200 px-1 rounded">cd backend</code></li>
                          <li>Start the server: <code className="bg-red-200 px-1 rounded">npm start</code></li>
                          <li>Check SETUP_GUIDE.md for detailed instructions</li>
                        </ol>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            <div className="space-y-5">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    className="appearance-none relative block w-full pl-10 pr-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    className="appearance-none relative block w-full pl-10 pr-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between mt-6">
              <Link
                to="/forgot-password"
                className="text-sm text-blue-600 hover:text-blue-500 transition-colors"
              >
                Forgot your password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105 mt-8"
            >
              {loading ? (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              ) : (
                <>
                  <LogIn className="h-5 w-5 mr-2" />
                  Sign In
                </>
              )}
            </button>
          </div>
        </form>

        <div className="text-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{' '}
            <Link
              to="/register"
              className="font-medium text-blue-600 hover:text-blue-500 transition-colors"
            >
              Sign up here
            </Link>
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 mt-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Users className="h-5 w-5 mr-2 text-blue-500" />
            Demo Accounts
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="bg-blue-50 p-3 rounded-lg">
              <p className="font-medium text-blue-900 mb-2">Employee</p>
              <p className="text-blue-700 mb-1">employee@demo.com</p>
              <p className="text-blue-700 mb-3">password123</p>
              <button
                onClick={() => handleDemoLogin('employee@demo.com', 'password123')}
                disabled={loading}
                className="w-full py-2 px-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50 text-xs"
              >
                Login as Employee
              </button>
            </div>
            <div className="bg-teal-50 p-3 rounded-lg">
              <p className="font-medium text-teal-900 mb-2">Admin</p>
              <p className="text-teal-700 mb-1">admin@demo.com</p>
              <p className="text-teal-700 mb-3">admin123</p>
              <button
                onClick={() => handleDemoLogin('admin@demo.com', 'admin123')}
                disabled={loading}
                className="w-full py-2 px-3 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors disabled:opacity-50 text-xs"
              >
                Login as Admin
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;