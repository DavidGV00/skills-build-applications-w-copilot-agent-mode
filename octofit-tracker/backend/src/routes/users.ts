import express, { Router, Request, Response } from 'express'
import User, { IUser } from '../models/User'

const router: Router = express.Router()

// @route   POST /api/users
// @desc    Create a new user
// @access  Public
router.post('/', async (req: Request, res: Response) => {
  try {
    const { name, email, age, weight, height, goal } = req.body

    // Validate required fields
    if (!name || !email) {
      return res.status(400).json({
        success: false,
        message: 'Name and email are required'
      })
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: 'User with this email already exists'
      })
    }

    // Create new user
    const user = new User({
      name,
      email,
      age,
      weight,
      height,
      goal
    })

    const savedUser = await user.save()

    res.status(201).json({
      success: true,
      message: 'User created successfully',
      data: savedUser
    })
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message || 'Error creating user'
    })
  }
})

// @route   GET /api/users
// @desc    Get all users
// @access  Public
router.get('/', async (req: Request, res: Response) => {
  try {
    const users = await User.find().sort({ createdAt: -1 })

    res.status(200).json({
      success: true,
      count: users.length,
      data: users
    })
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Error fetching users'
    })
  }
})

// @route   GET /api/users/:id
// @desc    Get user by ID
// @access  Public
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.params.id)

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      })
    }

    res.status(200).json({
      success: true,
      data: user
    })
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Error fetching user'
    })
  }
})

// @route   PUT /api/users/:id
// @desc    Update user
// @access  Public
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    )

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      })
    }

    res.status(200).json({
      success: true,
      message: 'User updated successfully',
      data: user
    })
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message || 'Error updating user'
    })
  }
})

// @route   DELETE /api/users/:id
// @desc    Delete user
// @access  Public
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id)

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      })
    }

    res.status(200).json({
      success: true,
      message: 'User deleted successfully',
      data: user
    })
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Error deleting user'
    })
  }
})

export default router
