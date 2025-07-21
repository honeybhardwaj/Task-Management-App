const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Task = require('../models/Task'); // adjust path as needed
const authMiddleware = require('../middleware/auth'); // adjust if needed


// @route   GET /analytics
// @desc    Return analytics data: priority distribution, completion timeline, upcoming deadlines
// @access  Private
router.get('/',authMiddleware, async (req, res) => {
  try {
    // Use logged-in user ID or fallback to hardcoded one (use req.user?.id if using auth)
    const userId = req.user.id;

    // Priority Distribution (Pie Chart)
    const priorityDistribution = await Task.aggregate([
      { $match: { userId: new mongoose.Types.ObjectId(userId) } },
      {
        $group: {
          _id: '$priority',
          count: { $sum: 1 }
        }
      },
      {
        $project: {
          name: '$_id',
          value: '$count',
          _id: 0
        }
      }
    ]);

    // Completion Rate Over Time (Line Chart)
    const completionTimeline = await Task.aggregate([
      {
        $match: {
          userId: new mongoose.Types.ObjectId(userId),
          isCompleted: true
        }
      },
      {
        $group: {
          _id: {
            $dateToString: { format: '%Y-%m-%d', date: '$updatedAt' }
          },
          count: { $sum: 1 }
        }
      },
      {
        $project: {
          date: '$_id',
          count: 1,
          _id: 0
        }
      },
      { $sort: { date: 1 } }
    ]);

    // Upcoming Deadlines (Calendar View)
    const upcomingTasks = await Task.find({
      userId: new mongoose.Types.ObjectId(userId),
      dueDate: { $gte: new Date() }
    }).select('title dueDate');

    res.json({ priorityDistribution, completionTimeline, upcomingTasks });
  } catch (err) {
    console.error('Analytics error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
