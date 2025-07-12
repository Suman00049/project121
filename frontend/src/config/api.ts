// API Configuration for different environments
const getApiUrl = (): string => {
  const envUrl = import.meta.env.VITE_API_URL?.trim();

  if (import.meta.env.DEV) {
    return envUrl || 'http://localhost:3001';
  }

  // Production fallback (only used if env var fails)
  return envUrl || 'https://project121-iota.vercel.app';
};

export const API_BASE_URL = getApiUrl();

// API endpoints
export const API_ENDPOINTS = {
  // User endpoints
  USERS: `${API_BASE_URL}/api/users`,
  USER_BY_ID: (uid: string) => `${API_BASE_URL}/api/users/${uid}`,
  
  // Attendance endpoints
  ATTENDANCE_TODAY: (uid: string) => `${API_BASE_URL}/api/attendance/today/${uid}`,
  CLOCK_IN: `${API_BASE_URL}/api/attendance/clock-in`,
  CLOCK_OUT: `${API_BASE_URL}/api/attendance/clock-out`,
  START_LUNCH_BREAK: `${API_BASE_URL}/api/attendance/start-lunch-break`,
  END_LUNCH_BREAK: `${API_BASE_URL}/api/attendance/end-lunch-break`,
  START_SNACK_BREAK: `${API_BASE_URL}/api/attendance/start-snack-break`,
  END_SNACK_BREAK: `${API_BASE_URL}/api/attendance/end-snack-break`,
  
  // Admin endpoints
  ADMIN_EMPLOYEES: `${API_BASE_URL}/api/admin/employees`,
  ADMIN_ATTENDANCE: `${API_BASE_URL}/api/admin/attendance`,
  ADMIN_STATISTICS: `${API_BASE_URL}/api/admin/statistics`,
  
  // Health check
  HEALTH: `${API_BASE_URL}/api/health`
};
