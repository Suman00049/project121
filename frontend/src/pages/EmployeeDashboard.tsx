import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useAttendance } from '../contexts/AttendanceContext';
import { 
  Clock, 
  LogOut, 
  Coffee, 
  UtensilsCrossed, 
  PlayCircle, 
  PauseCircle, 
  Calendar,
  User,
  Timer
} from 'lucide-react';
import { format } from 'date-fns';

const EmployeeDashboard: React.FC = () => {
  const { currentUser, logout } = useAuth();
  const { 
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
    loading
  } = useAttendance();
  
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (time: string) => {
    return format(new Date(time), 'HH:mm:ss');
  };

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  const handleLogout = async () => {
    await logout();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-teal-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="h-16 w-16 bg-gradient-to-br from-blue-500 to-teal-500 rounded-full flex items-center justify-center">
                <User className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Welcome back!
                </h1>
                <p className="text-gray-600">{currentUser?.email}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <div className="text-2xl font-bold text-gray-900">
                  {format(currentTime, 'HH:mm:ss')}
                </div>
                <div className="text-sm text-gray-500">
                  {format(currentTime, 'EEEE, MMMM do')}
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </button>
            </div>
          </div>
        </div>

        {/* Attendance Controls */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Clock In/Out */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <Clock className="h-5 w-5 text-blue-500" />
                <h3 className="text-lg font-semibold text-gray-900">
                  {isLoggedIn ? 'Clock Out' : 'Clock In'}
                </h3>
              </div>
              <div className={`h-3 w-3 rounded-full ${isLoggedIn ? 'bg-green-500' : 'bg-gray-300'}`} />
            </div>
            <button
              onClick={isLoggedIn ? clockOut : clockIn}
              disabled={loading}
              className={`w-full py-3 px-4 rounded-lg font-medium transition-all duration-200 ${
                isLoggedIn 
                  ? 'bg-red-500 hover:bg-red-600 text-white' 
                  : 'bg-green-500 hover:bg-green-600 text-white'
              } disabled:opacity-50`}
            >
              {loading ? (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mx-auto"></div>
              ) : (
                <>
                  {isLoggedIn ? <PauseCircle className="h-5 w-5 mx-auto" /> : <PlayCircle className="h-5 w-5 mx-auto" />}
                </>
              )}
            </button>
            {todayRecord?.loginTime && (
              <p className="text-sm text-gray-500 mt-2 text-center">
                In: {formatTime(todayRecord.loginTime)}
              </p>
            )}
          </div>

          {/* Lunch Break */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <UtensilsCrossed className="h-5 w-5 text-orange-500" />
                <h3 className="text-lg font-semibold text-gray-900">Lunch Break</h3>
              </div>
              <div className={`h-3 w-3 rounded-full ${isOnLunchBreak ? 'bg-orange-500' : 'bg-gray-300'}`} />
            </div>
            <button
              onClick={isOnLunchBreak ? endLunchBreak : startLunchBreak}
              disabled={loading || !isLoggedIn}
              className={`w-full py-3 px-4 rounded-lg font-medium transition-all duration-200 ${
                isOnLunchBreak 
                  ? 'bg-orange-500 hover:bg-orange-600 text-white' 
                  : 'bg-orange-100 hover:bg-orange-200 text-orange-700'
              } disabled:opacity-50`}
            >
              {isOnLunchBreak ? 'End Break' : 'Start Break'}
            </button>
          </div>

          {/* Snack Break */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <Coffee className="h-5 w-5 text-purple-500" />
                <h3 className="text-lg font-semibold text-gray-900">Snack Break</h3>
              </div>
              <div className={`h-3 w-3 rounded-full ${isOnSnackBreak ? 'bg-purple-500' : 'bg-gray-300'}`} />
            </div>
            <button
              onClick={isOnSnackBreak ? endSnackBreak : startSnackBreak}
              disabled={loading || !isLoggedIn}
              className={`w-full py-3 px-4 rounded-lg font-medium transition-all duration-200 ${
                isOnSnackBreak 
                  ? 'bg-purple-500 hover:bg-purple-600 text-white' 
                  : 'bg-purple-100 hover:bg-purple-200 text-purple-700'
              } disabled:opacity-50`}
            >
              {isOnSnackBreak ? 'End Break' : 'Start Break'}
            </button>
          </div>

          {/* Status */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
            <div className="flex items-center space-x-2 mb-4">
              <Timer className="h-5 w-5 text-blue-500" />
              <h3 className="text-lg font-semibold text-gray-900">Status</h3>
            </div>
            <div className="space-y-2">
              <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                isLoggedIn 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-gray-100 text-gray-800'
              }`}>
                {isLoggedIn ? 'Working' : 'Not Working'}
              </div>
              {isOnLunchBreak && (
                <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-orange-100 text-orange-800 ml-2">
                  Lunch Break
                </div>
              )}
              {isOnSnackBreak && (
                <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800 ml-2">
                  Snack Break
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Today's Summary */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 mb-8">
          <div className="flex items-center space-x-2 mb-6">
            <Calendar className="h-6 w-6 text-blue-500" />
            <h2 className="text-2xl font-bold text-gray-900">Today's Summary</h2>
          </div>
          
          {todayRecord ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-blue-50 rounded-xl p-4">
                <h3 className="text-sm font-medium text-blue-900 mb-2">Total Work Time</h3>
                <p className="text-2xl font-bold text-blue-600">
                  {formatDuration(todayRecord.totalWorkTime)}
                </p>
              </div>
              <div className="bg-orange-50 rounded-xl p-4">
                <h3 className="text-sm font-medium text-orange-900 mb-2">Break Time</h3>
                <p className="text-2xl font-bold text-orange-600">
                  {formatDuration(todayRecord.totalBreakTime)}
                </p>
              </div>
              <div className="bg-green-50 rounded-xl p-4">
                <h3 className="text-sm font-medium text-green-900 mb-2">Net Work Time</h3>
                <p className="text-2xl font-bold text-green-600">
                  {formatDuration(todayRecord.netWorkTime)}
                </p>
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500">No attendance record for today. Clock in to start tracking!</p>
            </div>
          )}
        </div>

        {/* Activity Log */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Today's Activity</h2>
          
          {todayRecord ? (
            <div className="space-y-4">
              {todayRecord.loginTime && (
                <div className="flex items-center space-x-4 p-4 bg-green-50 rounded-lg">
                  <div className="h-10 w-10 bg-green-500 rounded-full flex items-center justify-center">
                    <Clock className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="font-medium text-green-900">Clocked In</p>
                    <p className="text-sm text-green-700">{formatTime(todayRecord.loginTime)}</p>
                  </div>
                </div>
              )}
              
              {todayRecord.lunchBreaks.map((lunch, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center space-x-4 p-4 bg-orange-50 rounded-lg">
                    <div className="h-10 w-10 bg-orange-500 rounded-full flex items-center justify-center">
                      <UtensilsCrossed className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <p className="font-medium text-orange-900">Lunch Break Started</p>
                      <p className="text-sm text-orange-700">{formatTime(lunch.start)}</p>
                    </div>
                  </div>
                  {lunch.end && (
                    <div className="flex items-center space-x-4 p-4 bg-orange-50 rounded-lg">
                      <div className="h-10 w-10 bg-orange-500 rounded-full flex items-center justify-center">
                        <UtensilsCrossed className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <p className="font-medium text-orange-900">Lunch Break Ended</p>
                        <p className="text-sm text-orange-700">{formatTime(lunch.end)}</p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
              
              {todayRecord.snackBreaks.map((snack, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center space-x-4 p-4 bg-purple-50 rounded-lg">
                    <div className="h-10 w-10 bg-purple-500 rounded-full flex items-center justify-center">
                      <Coffee className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <p className="font-medium text-purple-900">Snack Break Started</p>
                      <p className="text-sm text-purple-700">{formatTime(snack.start)}</p>
                    </div>
                  </div>
                  {snack.end && (
                    <div className="flex items-center space-x-4 p-4 bg-purple-50 rounded-lg">
                      <div className="h-10 w-10 bg-purple-500 rounded-full flex items-center justify-center">
                        <Coffee className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <p className="font-medium text-purple-900">Snack Break Ended</p>
                        <p className="text-sm text-purple-700">{formatTime(snack.end)}</p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
              
              {todayRecord.logoutTime && (
                <div className="flex items-center space-x-4 p-4 bg-red-50 rounded-lg">
                  <div className="h-10 w-10 bg-red-500 rounded-full flex items-center justify-center">
                    <Clock className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="font-medium text-red-900">Clocked Out</p>
                    <p className="text-sm text-red-700">{formatTime(todayRecord.logoutTime)}</p>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500">No activity recorded for today.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmployeeDashboard;