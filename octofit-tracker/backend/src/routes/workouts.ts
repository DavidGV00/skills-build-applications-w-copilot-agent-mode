import express, { Router, Request, Response } from 'express'
import Workout, { IWorkout } from '../models/Workout'
import User from '../models/User'

const router: Router = express.Router()

// @route   POST /api/workouts
// @desc    Create a new workout
// @access  Public
router.post('/', async (req: Request, res: Response) => {
  try {
    const { userId, name, type, duration, caloriesBurned, intensity, date, notes } = req.body

    // Validate required fields
    if (!userId || !name || !type || !duration || caloriesBurned === undefined || !intensity) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields: userId, name, type, duration, caloriesBurned, intensity'
      })
    }

    // Verify user exists
    const user = await User.findById(userId)
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      })
    }

    // Create new workout
    const workout = new Workout({
      userId,
      name,
      type,
      duration,
      caloriesBurned,
      intensity,
      date: date || new Date(),
      notes
    })

    const savedWorkout = await workout.save()

    res.status(201).json({
      success: true,
      message: 'Workout created successfully',
      data: savedWorkout
    })
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message || 'Error creating workout'
    })
  }
})

// @route   GET /api/workouts
// @desc    Get all workouts
// @access  Public
router.get('/', async (req: Request, res: Response) => {
  try {
    const workouts = await Workout.find()
      .populate('userId', 'name email')
      .sort({ date: -1 })

    res.status(200).json({
      success: true,
      count: workouts.length,
      data: workouts
    })
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Error fetching workouts'
    })
  }
})

// @route   GET /api/workouts/:id
// @desc    Get workout by ID
// @access  Public
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const workout = await Workout.findById(req.params.id).populate('userId', 'name email')

    if (!workout) {
      return res.status(404).json({
        success: false,
        message: 'Workout not found'
      })
    }

    res.status(200).json({
      success: true,
      data: workout
    })
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Error fetching workout'
    })
  }
})

// @route   GET /api/workouts/user/:userId
// @desc    Get workouts for a specific user
// @access  Public
router.get('/user/:userId', async (req: Request, res: Response) => {
  try {
    const workouts = await Workout.find({ userId: req.params.userId })
      .populate('userId', 'name email')
      .sort({ date: -1 })

    res.status(200).json({
      success: true,
      count: workouts.length,
      data: workouts
    })
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Error fetching user workouts'
    })
  }
})

// @route   PUT /api/workouts/:id
// @desc    Update workout
// @access  Public
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const workout = await Workout.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    ).populate('userId', 'name email')

    if (!workout) {
      return res.status(404).json({
        success: false,
        message: 'Workout not found'
      })
    }

    res.status(200).json({
      success: true,
      message: 'Workout updated successfully',
      data: workout
    })
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message || 'Error updating workout'
    })
  }
})

// @route   DELETE /api/workouts/:id
// @desc    Delete workout
// @access  Public
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const workout = await Workout.findByIdAndDelete(req.params.id)

    if (!workout) {
      return res.status(404).json({
        success: false,
        message: 'Workout not found'
      })
    }

    res.status(200).json({
      success: true,
      message: 'Workout deleted successfully',
      data: workout
    })
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Error deleting workout'
    })
  }
})

// @route   GET /api/workouts/stats/user/:userId
// @desc    Get workout statistics for a user
// @access  Public
router.get('/stats/user/:userId', async (req: Request, res: Response) => {
  try {
    const workouts = await Workout.find({ userId: req.params.userId })

    if (workouts.length === 0) {
      return res.status(200).json({
        success: true,
        message: 'No workouts found for this user',
        data: {
          totalWorkouts: 0,
          totalDuration: 0,
          totalCaloriesBurned: 0,
          averageIntensity: 'N/A'
        }
      })
    }

    const totalDuration = workouts.reduce((sum, w) => sum + w.duration, 0)
    const totalCaloriesBurned = workouts.reduce((sum, w) => sum + w.caloriesBurned, 0)
    const intensityCounts = workouts.reduce((acc, w) => {
      acc[w.intensity] = (acc[w.intensity] || 0) + 1
      return acc
    }, {} as Record<string, number>)

    const mostCommonIntensity = Object.keys(intensityCounts).reduce((a, b) =>
      intensityCounts[a] > intensityCounts[b] ? a : b
    )

    res.status(200).json({
      success: true,
      data: {
        totalWorkouts: workouts.length,
        totalDuration,
        totalCaloriesBurned,
        averageIntensity: mostCommonIntensity,
        intensityBreakdown: intensityCounts
      }
    })
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Error fetching workout statistics'
    })
  }
})

export default router
