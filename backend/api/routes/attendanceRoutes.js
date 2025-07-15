import express from 'express';
import Attendance from '../models/Attendance.js';

const router = express.Router();

// Helper function to calculate time differences in minutes
const calculateMinutes = (startTime, endTime) => {
  if (!startTime || !endTime) return 0;
  return Math.floor((new Date(endTime) - new Date(startTime)) / 60000);
};

// Helper function to update attendance calculations
const updateAttendanceCalculations = async (attendance) => {
  const { loginTime, logoutTime, lunchBreaks, snackBreaks } = attendance;
  
  let totalWorkTime = 0;
  let totalBreakTime = 0;
  
  if (loginTime) {
    const endTime = logoutTime || new Date();
    totalWorkTime = calculateMinutes(loginTime, endTime);
  }
  
  // Calculate lunch break time
  lunchBreaks.forEach(lunch => {
    if (lunch.start && lunch.end) {
      totalBreakTime += calculateMinutes(lunch.start, lunch.end);
    }
  });
  
  // Calculate snack break time
  snackBreaks.forEach(snack => {
    if (snack.start && snack.end) {
      totalBreakTime += calculateMinutes(snack.start, snack.end);
    }
  });
  
  const netWorkTime = totalWorkTime - totalBreakTime;
  
  attendance.totalWorkTime = totalWorkTime;
  attendance.totalBreakTime = totalBreakTime;
  attendance.netWorkTime = netWorkTime;
  
  await attendance.save();
};

// Get today's attendance record
router.get('/today/:uid', async (req, res) => {
  try {
    const today = new Date().toISOString().split('T')[0];
    const attendance = await Attendance.findOne({ 
      uid: req.params.uid, 
      date: today 
    });
    
    if (attendance) {
      await updateAttendanceCalculations(attendance);
    }
    
    res.json(attendance);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching attendance', error: error.message });
  }
});

// Clock in
router.post('/clock-in', async (req, res) => {
  try {
    const { uid } = req.body;
    const today = new Date().toISOString().split('T')[0];
    
    let attendance = await Attendance.findOne({ uid, date: today });
    
    if (!attendance) {
      attendance = new Attendance({
        uid,
        date: today,
        loginTime: new Date(),
        lunchBreaks: [],
        snackBreaks: []
      });
    } else {
      attendance.loginTime = new Date();
    }
    
    await attendance.save();
    await updateAttendanceCalculations(attendance);
    
    res.json(attendance);
  } catch (error) {
    res.status(500).json({ message: 'Error clocking in', error: error.message });
  }
});

// Clock out
router.post('/clock-out', async (req, res) => {
  try {
    const { uid } = req.body;
    const today = new Date().toISOString().split('T')[0];
    
    const attendance = await Attendance.findOne({ uid, date: today });
    
    if (!attendance) {
      return res.status(404).json({ message: 'No attendance record found for today' });
    }
    
    attendance.logoutTime = new Date();
    await attendance.save();
    await updateAttendanceCalculations(attendance);
    
    res.json(attendance);
  } catch (error) {
    res.status(500).json({ message: 'Error clocking out', error: error.message });
  }
});

// Start lunch break
router.post('/start-lunch-break', async (req, res) => {
  try {
    const { uid } = req.body;
    const today = new Date().toISOString().split('T')[0];
    
    const attendance = await Attendance.findOne({ uid, date: today });
    
    if (!attendance) {
      return res.status(404).json({ message: 'No attendance record found for today' });
    }
    
    attendance.lunchBreaks.push({ start: new Date() });
    await attendance.save();
    await updateAttendanceCalculations(attendance);
    
    res.json(attendance);
  } catch (error) {
    res.status(500).json({ message: 'Error starting lunch break', error: error.message });
  }
});

// End lunch break
router.post('/end-lunch-break', async (req, res) => {
  try {
    const { uid } = req.body;
    const today = new Date().toISOString().split('T')[0];
    
    const attendance = await Attendance.findOne({ uid, date: today });
    
    if (!attendance) {
      return res.status(404).json({ message: 'No attendance record found for today' });
    }
    
    const currentLunchBreak = attendance.lunchBreaks.find(lunch => !lunch.end);
    if (currentLunchBreak) {
      currentLunchBreak.end = new Date();
    }
    
    await attendance.save();
    await updateAttendanceCalculations(attendance);
    
    res.json(attendance);
  } catch (error) {
    res.status(500).json({ message: 'Error ending lunch break', error: error.message });
  }
});

// Start snack break
router.post('/start-snack-break', async (req, res) => {
  try {
    const { uid } = req.body;
    const today = new Date().toISOString().split('T')[0];
    
    const attendance = await Attendance.findOne({ uid, date: today });
    
    if (!attendance) {
      return res.status(404).json({ message: 'No attendance record found for today' });
    }
    
    attendance.snackBreaks.push({ start: new Date() });
    await attendance.save();
    await updateAttendanceCalculations(attendance);
    
    res.json(attendance);
  } catch (error) {
    res.status(500).json({ message: 'Error starting snack break', error: error.message });
  }
});

// End snack break
router.post('/end-snack-break', async (req, res) => {
  try {
    const { uid } = req.body;
    const today = new Date().toISOString().split('T')[0];
    
    const attendance = await Attendance.findOne({ uid, date: today });
    
    if (!attendance) {
      return res.status(404).json({ message: 'No attendance record found for today' });
    }
    
    const currentSnackBreak = attendance.snackBreaks.find(snack => !snack.end);
    if (currentSnackBreak) {
      currentSnackBreak.end = new Date();
    }
    
    await attendance.save();
    await updateAttendanceCalculations(attendance);
    
    res.json(attendance);
  } catch (error) {
    res.status(500).json({ message: 'Error ending snack break', error: error.message });
  }
});

export default router;