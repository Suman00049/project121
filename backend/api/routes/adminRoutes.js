import express from 'express';
import User from '../models/User.js';
import Attendance from '../models/Attendance.js';

const router = express.Router();

// Get all employees
router.get('/employees', async (req, res) => {
  try {
    const employees = await User.find({ role: 'employee' });
    res.json(employees);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching employees', error: error.message });
  }
});

// Get attendance records with filters
router.get('/attendance', async (req, res) => {
  try {
    const { month, employee } = req.query;
    
    let query = {};
    
    if (month) {
      // Get records for the specified month
      const startOfMonth = `${month}-01`;
      const endOfMonth = `${month}-31`;
      query.date = { $gte: startOfMonth, $lte: endOfMonth };
    }
    
    if (employee) {
      query.uid = employee;
    }
    
    const attendanceRecords = await Attendance.find(query).sort({ date: -1 });
    
    // Populate user information
    const recordsWithUsers = await Promise.all(
      attendanceRecords.map(async (record) => {
        const user = await User.findOne({ uid: record.uid });
        return {
          ...record.toJSON(),
          user: user || { email: 'Unknown', uid: record.uid }
        };
      })
    );
    
    res.json(recordsWithUsers);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching attendance records', error: error.message });
  }
});

// Get employee statistics
router.get('/statistics', async (req, res) => {
  try {
    const { month } = req.query;
    
    let query = {};
    if (month) {
      const startOfMonth = `${month}-01`;
      const endOfMonth = `${month}-31`;
      query.date = { $gte: startOfMonth, $lte: endOfMonth };
    }
    
    const totalEmployees = await User.countDocuments({ role: 'employee' });
    const totalRecords = await Attendance.countDocuments(query);
    
    const workTimeAgg = await Attendance.aggregate([
      { $match: query },
      {
        $group: {
          _id: null,
          totalWorkTime: { $sum: '$totalWorkTime' },
          totalBreakTime: { $sum: '$totalBreakTime' },
          avgWorkTime: { $avg: '$netWorkTime' }
        }
      }
    ]);
    
    const stats = {
      totalEmployees,
      totalRecords,
      totalWorkTime: workTimeAgg[0]?.totalWorkTime || 0,
      totalBreakTime: workTimeAgg[0]?.totalBreakTime || 0,
      avgWorkTime: workTimeAgg[0]?.avgWorkTime || 0
    };
    
    res.json(stats);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching statistics', error: error.message });
  }
});

export default router;