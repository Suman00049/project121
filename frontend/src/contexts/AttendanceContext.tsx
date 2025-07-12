// import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
// import { useAuth } from './AuthContext';
// import { API_ENDPOINTS } from '../config/api';

// interface AttendanceRecord {
//   _id: string;
//   date: string;
//   loginTime: string;
//   logoutTime?: string;
//   lunchBreaks: Array<{ start: string; end?: string }>;
//   snackBreaks: Array<{ start: string; end?: string }>;
//   totalWorkTime: number;
//   totalBreakTime: number;
//   netWorkTime: number;
// }

// interface AttendanceContextType {
//   todayRecord: AttendanceRecord | null;
//   isLoggedIn: boolean;
//   isOnLunchBreak: boolean;
//   isOnSnackBreak: boolean;
//   clockIn: () => Promise<void>;
//   clockOut: () => Promise<void>;
//   startLunchBreak: () => Promise<void>;
//   endLunchBreak: () => Promise<void>;
//   startSnackBreak: () => Promise<void>;
//   endSnackBreak: () => Promise<void>;
//   refreshRecord: () => Promise<void>;
//   loading: boolean;
//   error: string | null;
// }

// const AttendanceContext = createContext<AttendanceContextType | undefined>(undefined);

// export const useAttendance = () => {
//   const context = useContext(AttendanceContext);
//   if (!context) {
//     throw new Error('useAttendance must be used within an AttendanceProvider');
//   }
//   return context;
// };

// interface AttendanceProviderProps {
//   children: ReactNode;
// }

// export const AttendanceProvider: React.FC<AttendanceProviderProps> = ({ children }) => {
//   const { currentUser } = useAuth();
//   const [todayRecord, setTodayRecord] = useState<AttendanceRecord | null>(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   const isLoggedIn = todayRecord?.loginTime && !todayRecord?.logoutTime;
//   const isOnLunchBreak = todayRecord?.lunchBreaks.some(b => b.start && !b.end) || false;
//   const isOnSnackBreak = todayRecord?.snackBreaks.some(b => b.start && !b.end) || false;

//   const handleApiError = (error: any, operation: string) => {
//     console.error(`Error ${operation}:`, error);
//     if (error instanceof TypeError && error.message === 'Failed to fetch') {
//       const errorMessage = 'Unable to connect to the server. Please ensure the backend server is running.';
//       setError(errorMessage);
//       throw new Error(errorMessage);
//     }
//     throw error;
//   };

//   const refreshRecord = async () => {
//     if (!currentUser) return;
    
//     setLoading(true);
//     setError(null);
//     try {
//       const response = await fetch(API_ENDPOINTS.ATTENDANCE_TODAY(currentUser.uid));
//       const data = await response.json();
//       setTodayRecord(data);
//     } catch (error) {
//       handleApiError(error, 'fetching today record');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const clockIn = async () => {
//     if (!currentUser) return;
    
//     setError(null);
//     try {
//       const response = await fetch(API_ENDPOINTS.CLOCK_IN, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ uid: currentUser.uid })
//       });
      
//       if (response.ok) {
//         await refreshRecord();
//       }
//     } catch (error) {
//       handleApiError(error, 'clocking in');
//     }
//   };

//   const clockOut = async () => {
//     if (!currentUser) return;
    
//     setError(null);
//     try {
//       const response = await fetch(API_ENDPOINTS.CLOCK_OUT, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ uid: currentUser.uid })
//       });
      
//       if (response.ok) {
//         await refreshRecord();
//       }
//     } catch (error) {
//       handleApiError(error, 'clocking out');
//     }
//   };

//   const startLunchBreak = async () => {
//     if (!currentUser) return;
    
//     setError(null);
//     try {
//       const response = await fetch(API_ENDPOINTS.START_LUNCH_BREAK, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ uid: currentUser.uid })
//       });
      
//       if (response.ok) {
//         await refreshRecord();
//       }
//     } catch (error) {
//       handleApiError(error, 'starting lunch break');
//     }
//   };

//   const endLunchBreak = async () => {
//     if (!currentUser) return;
    
//     setError(null);
//     try {
//       const response = await fetch(API_ENDPOINTS.END_LUNCH_BREAK, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ uid: currentUser.uid })
//       });
      
//       if (response.ok) {
//         await refreshRecord();
//       }
//     } catch (error) {
//       handleApiError(error, 'ending lunch break');
//     }
//   };

//   const startSnackBreak = async () => {
//     if (!currentUser) return;
    
//     setError(null);
//     try {
//       const response = await fetch(API_ENDPOINTS.START_SNACK_BREAK, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ uid: currentUser.uid })
//       });
      
//       if (response.ok) {
//         await refreshRecord();
//       }
//     } catch (error) {
//       handleApiError(error, 'starting snack break');
//     }
//   };

//   const endSnackBreak = async () => {
//     if (!currentUser) return;
    
//     setError(null);
//     try {
//       const response = await fetch(API_ENDPOINTS.END_SNACK_BREAK, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ uid: currentUser.uid })
//       });
      
//       if (response.ok) {
//         await refreshRecord();
//       }
//     } catch (error) {
//       handleApiError(error, 'ending snack break');
//     }
//   };

//   useEffect(() => {
//     if (currentUser) {
//       refreshRecord();
//     }
//   }, [currentUser]);

//   const value = {
//     todayRecord,
//     isLoggedIn,
//     isOnLunchBreak,
//     isOnSnackBreak,
//     clockIn,
//     clockOut,
//     startLunchBreak,
//     endLunchBreak,
//     startSnackBreak,
//     endSnackBreak,
//     refreshRecord,
//     loading,
//     error
//   };

//   return (
//     <AttendanceContext.Provider value={value}>
//       {children}
//     </AttendanceContext.Provider>
//   );
// };


import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useAuth } from './AuthContext';
import { API_ENDPOINTS } from '../config/api';

interface AttendanceRecord {
  _id: string;
  date: string;
  loginTime: string;
  logoutTime?: string;
  lunchBreaks: Array<{ start: string; end?: string }>;
  snackBreaks: Array<{ start: string; end?: string }>;
  totalWorkTime: number;
  totalBreakTime: number;
  netWorkTime: number;
}

interface AttendanceContextType {
  todayRecord: AttendanceRecord | null;
  isLoggedIn: boolean;
  isOnLunchBreak: boolean;
  isOnSnackBreak: boolean;
  clockIn: () => Promise<void>;
  clockOut: () => Promise<void>;
  startLunchBreak: () => Promise<void>;
  endLunchBreak: () => Promise<void>;
  startSnackBreak: () => Promise<void>;
  endSnackBreak: () => Promise<void>;
  refreshRecord: () => Promise<void>;
  loading: boolean;
  error: string | null;
}

const AttendanceContext = createContext<AttendanceContextType | undefined>(undefined);

export const useAttendance = () => {
  const context = useContext(AttendanceContext);
  if (!context) {
    throw new Error('useAttendance must be used within an AttendanceProvider');
  }
  return context;
};

interface AttendanceProviderProps {
  children: ReactNode;
}

export const AttendanceProvider: React.FC<AttendanceProviderProps> = ({ children }) => {
  const { currentUser } = useAuth();
  const [todayRecord, setTodayRecord] = useState<AttendanceRecord | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // ✅ Ensure strict boolean type
  const isLoggedIn = !!(todayRecord?.loginTime && !todayRecord?.logoutTime);
  const isOnLunchBreak = todayRecord?.lunchBreaks.some(b => b.start && !b.end) || false;
  const isOnSnackBreak = todayRecord?.snackBreaks.some(b => b.start && !b.end) || false;

  const handleApiError = (error: any, operation: string) => {
    console.error(`Error ${operation}:`, error);
    if (error instanceof TypeError && error.message === 'Failed to fetch') {
      const errorMessage = 'Unable to connect to the server. Please ensure the backend server is running.';
      setError(errorMessage);
      throw new Error(errorMessage);
    }
    throw error;
  };

  const refreshRecord = async () => {
    if (!currentUser) return;

    setLoading(true);
    setError(null);
    try {
      const response = await fetch(API_ENDPOINTS.ATTENDANCE_TODAY(currentUser.uid));
      const data = await response.json();
      setTodayRecord(data);
    } catch (error) {
      handleApiError(error, 'fetching today record');
    } finally {
      setLoading(false);
    }
  };

  const clockIn = async () => {
    if (!currentUser) return;

    setError(null);
    try {
      const response = await fetch(API_ENDPOINTS.CLOCK_IN, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ uid: currentUser.uid })
      });

      if (response.ok) {
        await refreshRecord();
      }
    } catch (error) {
      handleApiError(error, 'clocking in');
    }
  };

  const clockOut = async () => {
    if (!currentUser) return;

    setError(null);
    try {
      const response = await fetch(API_ENDPOINTS.CLOCK_OUT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ uid: currentUser.uid })
      });

      if (response.ok) {
        await refreshRecord();
      }
    } catch (error) {
      handleApiError(error, 'clocking out');
    }
  };

  const startLunchBreak = async () => {
    if (!currentUser) return;

    setError(null);
    try {
      const response = await fetch(API_ENDPOINTS.START_LUNCH_BREAK, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ uid: currentUser.uid })
      });

      if (response.ok) {
        await refreshRecord();
      }
    } catch (error) {
      handleApiError(error, 'starting lunch break');
    }
  };

  const endLunchBreak = async () => {
    if (!currentUser) return;

    setError(null);
    try {
      const response = await fetch(API_ENDPOINTS.END_LUNCH_BREAK, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ uid: currentUser.uid })
      });

      if (response.ok) {
        await refreshRecord();
      }
    } catch (error) {
      handleApiError(error, 'ending lunch break');
    }
  };

  const startSnackBreak = async () => {
    if (!currentUser) return;

    setError(null);
    try {
      const response = await fetch(API_ENDPOINTS.START_SNACK_BREAK, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ uid: currentUser.uid })
      });

      if (response.ok) {
        await refreshRecord();
      }
    } catch (error) {
      handleApiError(error, 'starting snack break');
    }
  };

  const endSnackBreak = async () => {
    if (!currentUser) return;

    setError(null);
    try {
      const response = await fetch(API_ENDPOINTS.END_SNACK_BREAK, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ uid: currentUser.uid })
      });

      if (response.ok) {
        await refreshRecord();
      }
    } catch (error) {
      handleApiError(error, 'ending snack break');
    }
  };

  useEffect(() => {
    if (currentUser) {
      refreshRecord();
    }
  }, [currentUser]);

  const value = {
    todayRecord,
    isLoggedIn,
    isOnLunchBreak,
    isOnSnackBreak,
    clockIn,
    clockOut,
    startLunchBreak,
    endLunchBreak,
    startSnackBreak,
    endSnackBreak,
    refreshRecord,
    loading,
    error
  };

  return (
    <AttendanceContext.Provider value={value}>
      {children}
    </AttendanceContext.Provider>
  );
};
