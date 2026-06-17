import { Request, Response, NextFunction } from 'express'

export const validateUserInput = (req: Request, res: Response, next: NextFunction) => {
  const { name, email, age, weight, height, goal } = req.body

  // Name validation
  if (name && typeof name !== 'string') {
    return res.status(400).json({
      success: false,
      message: 'Name must be a string'
    })
  }

  // Email validation
  if (email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid email format'
      })
    }
  }

  // Age validation
  if (age !== undefined && (typeof age !== 'number' || age < 1 || age > 150)) {
    return res.status(400).json({
      success: false,
      message: 'Age must be a number between 1 and 150'
    })
  }

  // Weight validation
  if (weight !== undefined && (typeof weight !== 'number' || weight < 20 || weight > 500)) {
    return res.status(400).json({
      success: false,
      message: 'Weight must be a number between 20 and 500'
    })
  }

  // Height validation
  if (height !== undefined && (typeof height !== 'number' || height < 50 || height > 300)) {
    return res.status(400).json({
      success: false,
      message: 'Height must be a number between 50 and 300'
    })
  }

  // Goal validation
  const validGoals = ['weight_loss', 'muscle_gain', 'endurance', 'general_fitness']
  if (goal && !validGoals.includes(goal)) {
    return res.status(400).json({
      success: false,
      message: `Goal must be one of: ${validGoals.join(', ')}`
    })
  }

  next()
}

export const validateWorkoutInput = (req: Request, res: Response, next: NextFunction) => {
  const { name, type, duration, caloriesBurned, intensity, notes } = req.body

  // Name validation
  if (name && typeof name !== 'string') {
    return res.status(400).json({
      success: false,
      message: 'Name must be a string'
    })
  }

  // Type validation
  const validTypes = ['cardio', 'strength', 'flexibility', 'sports', 'other']
  if (type && !validTypes.includes(type)) {
    return res.status(400).json({
      success: false,
      message: `Type must be one of: ${validTypes.join(', ')}`
    })
  }

  // Duration validation
  if (duration !== undefined && (typeof duration !== 'number' || duration < 1 || duration > 600)) {
    return res.status(400).json({
      success: false,
      message: 'Duration must be a number between 1 and 600 minutes'
    })
  }

  // Calories validation
  if (caloriesBurned !== undefined && (typeof caloriesBurned !== 'number' || caloriesBurned < 0)) {
    return res.status(400).json({
      success: false,
      message: 'Calories burned must be a positive number'
    })
  }

  // Intensity validation
  const validIntensities = ['low', 'moderate', 'high']
  if (intensity && !validIntensities.includes(intensity)) {
    return res.status(400).json({
      success: false,
      message: `Intensity must be one of: ${validIntensities.join(', ')}`
    })
  }

  // Notes validation
  if (notes && typeof notes !== 'string') {
    return res.status(400).json({
      success: false,
      message: 'Notes must be a string'
    })
  }

  next()
}
