import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { auth } from '../firebase/config';
import { API_ENDPOINTS } from '../config/api';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  User,
  sendPasswordResetEmail
} from 'firebase/auth';

interface AuthContextType {
  currentUser: User | null;
  userRole: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, role?: string) => Promise<void>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const login = async (email: string, password: string) => {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      await fetchUserRole(result.user.uid);
    } catch (error: any) {
      console.error('Login error details:', error);
      
      // If demo account doesn't exist, create it
      if ((error.code === 'auth/user-not-found' || error.code === 'auth/invalid-credential') && isDemoAccount(email)) {
        try {
          console.log('Creating demo account for:', email);
          await createDemoAccount(email, password);
          const result = await signInWithEmailAndPassword(auth, email, password);
          await fetchUserRole(result.user.uid);
          return;
        } catch (createError: any) {
          console.error('Error creating demo account:', createError);
          if (createError.code === 'auth/operation-not-allowed') {
            throw new Error('Firebase Email/Password authentication is not enabled. Please follow the setup guide to enable it in Firebase Console.');
          }
          throw createError;
        }
      }
      
      // Provide more specific error messages for non-demo accounts
      if (error.code === 'auth/invalid-credential') {
        throw new Error('Invalid email or password. Please check your credentials and try again.');
      } else if (error.code === 'auth/user-not-found') {
        throw new Error('No account found with this email address.');
      } else if (error.code === 'auth/wrong-password') {
        throw new Error('Incorrect password. Please try again.');
      } else if (error.code === 'auth/operation-not-allowed') {
        throw new Error('Firebase Email/Password authentication is not enabled. Please follow the setup guide to configure Firebase properly.');
      } else if (error.code === 'auth/configuration-not-found') {
        throw new Error('Firebase configuration is missing or invalid. Please check your .env file and Firebase setup.');
      } else {
        throw new Error(`Authentication failed: ${error.message}`);
      }
    }
  };

  const isDemoAccount = (email: string) => {
    return email === 'employee@demo.com' || email === 'admin@demo.com';
  };

  const createDemoAccount = async (email: string, password: string) => {
    console.log('Creating demo account:', email);
    const result = await createUserWithEmailAndPassword(auth, email, password);
    const role = email === 'admin@demo.com' ? 'admin' : 'employee';
    
    // Save user to backend
    try {
      const response = await fetch(API_ENDPOINTS.USERS, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          uid: result.user.uid,
          email: result.user.email,
          role: role
        })
      });
      
      if (!response.ok) {
        console.warn('Backend user creation failed, but Firebase auth succeeded');
      }
    } catch (backendError) {
      console.warn('Could not save user to backend:', backendError);
      // Continue anyway, as Firebase auth succeeded
    }
    
    setUserRole(role);
    console.log('Demo account created successfully:', email, 'with role:', role);
  };

  const register = async (email: string, password: string, role: string = 'employee') => {
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      
      // Save user to backend
      try {
        await fetch(API_ENDPOINTS.USERS, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            uid: result.user.uid,
            email: result.user.email,
            role: role
          })
        });
      } catch (backendError) {
        console.warn('Could not save user to backend:', backendError);
        // Continue anyway, as Firebase auth succeeded
      }
      
      setUserRole(role);
    } catch (error: any) {
      if (error.code === 'auth/operation-not-allowed') {
        throw new Error('Firebase Email/Password authentication is not enabled. Please enable it in the Firebase Console under Authentication > Sign-in method > Email/Password.');
      }
      throw error;
    }
  };

  const logout = async () => {
    await signOut(auth);
    setUserRole(null);
  };

  const resetPassword = async (email: string) => {
    await sendPasswordResetEmail(auth, email);
  };

  const fetchUserRole = async (uid: string) => {
    try {
      const response = await fetch(API_ENDPOINTS.USER_BY_ID(uid));
      if (response.ok) {
        const userData = await response.json();
        setUserRole(userData.role || 'employee');
      } else {
        console.warn('User not found in backend, defaulting to employee role');
        setUserRole('employee');
      }
    } catch (error) {
      console.error('Error fetching user role:', error);
      // Check if it's a network error (backend not running)
      if (error instanceof TypeError && error.message === 'Failed to fetch') {
        console.error('Backend server appears to be offline. Please start the backend server.');
        throw new Error('Unable to connect to the server. Please ensure the backend server is running.');
      }
      setUserRole('employee');
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      if (user) {
        try {
          await fetchUserRole(user.uid);
        } catch (error) {
          console.error('Failed to fetch user role during auth state change:', error);
          // Don't throw here, just set default role
          setUserRole('employee');
        }
      } else {
        setUserRole(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    userRole,
    login,
    register,
    logout,
    resetPassword,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};