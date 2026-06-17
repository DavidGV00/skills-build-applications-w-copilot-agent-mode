import mongoose from 'mongoose'
import dotenv from 'dotenv'
import User from '../models/User'
import Workout from '../models/Workout'
import { connectDB, disconnectDB } from '../config/database'

dotenv.config()

const resetDatabase = async () => {
  try {
    console.log('\n🚨 WARNING: This will delete ALL data from the database!')
    console.log('\n⏳ Resetting database...')
    
    // Connect to MongoDB
    await connectDB()
    
    // Clear all collections
    console.log('\n🧹 Clearing users...')
    const userResult = await User.deleteMany({})
    console.log(`✅ Deleted ${userResult.deletedCount} users`)
    
    console.log('\n🧹 Clearing workouts...')
    const workoutResult = await Workout.deleteMany({})
    console.log(`✅ Deleted ${workoutResult.deletedCount} workouts`)
    
    console.log('\n✨ Database reset completed successfully!')
    
    // Disconnect from database
    await disconnectDB()
    
  } catch (error) {
    console.error('\n❌ Error resetting database:', error)
    process.exit(1)
  }
}

// Run the reset function
resetDatabase()
