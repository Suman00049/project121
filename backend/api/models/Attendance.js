import mongoose from 'mongoose';

const breakSchema = new mongoose.Schema({
  start: {
    type: Date,
    required: true
  },
  end: {
    type: Date
  }
});

const attendanceSchema = new mongoose.Schema({
  uid: {
    type: String,
    required: true
  },
  date: {
    type: String,
    required: true
  },
  loginTime: {
    type: Date
  },
  logoutTime: {
    type: Date
  },
  lunchBreaks: [breakSchema],
  snackBreaks: [breakSchema],
  totalWorkTime: {
    type: Number,
    default: 0
  },
  totalBreakTime: {
    type: Number,
    default: 0
  },
  netWorkTime: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Compound index for uid and date
attendanceSchema.index({ uid: 1, date: 1 }, { unique: true });

export default mongoose.model('Attendance', attendanceSchema);