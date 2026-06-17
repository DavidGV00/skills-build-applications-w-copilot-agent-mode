import mongoose from 'mongoose'
import dotenv from 'dotenv'
import User from '../models/User'
import Workout from '../models/Workout'
import { connectDB, disconnectDB } from '../config/database'

dotenv.config()

const seedDatabase = async () => {
  try {
    console.log('\n🌱 Starting database seeding...')
    
    // Connect to MongoDB
    await connectDB()
    
    // Clear existing data
    console.log('\n🧹 Clearing existing data...')
    await User.deleteMany({})
    await Workout.deleteMany({})
    console.log('✅ Database cleared')
    
    // Create sample users
    console.log('\n👥 Creating sample users...')
    const users = await User.insertMany([
      {
        name: 'Alice Johnson',
        email: 'alice@example.com',
        age: 28,
        weight: 65,
        height: 170,
        goal: 'muscle_gain'
      },
      {
        name: 'Bob Smith',
        email: 'bob@example.com',
        age: 35,
        weight: 85,
        height: 180,
        goal: 'weight_loss'
      },
      {
        name: 'Carol Davis',
        email: 'carol@example.com',
        age: 31,
        weight: 60,
        height: 165,
        goal: 'endurance'
      },
      {
        name: 'David Wilson',
        email: 'david@example.com',
        age: 26,
        weight: 72,
        height: 175,
        goal: 'general_fitness'
      },
      {
        name: 'Emma Taylor',
        email: 'emma@example.com',
        age: 29,
        weight: 58,
        height: 162,
        goal: 'muscle_gain'
      }
    ])
    console.log(`✅ Created ${users.length} users`)
    users.forEach(user => {
      console.log(`   - ${user.name} (${user.email})`)
    })
    
    // Create sample workouts
    console.log('\n🏋️ Creating sample workouts...')
    const workouts = await Workout.insertMany([
      // Alice's workouts
      {
        userId: users[0]._id,
        name: 'Morning Run',
        type: 'cardio',
        duration: 30,
        caloriesBurned: 300,
        intensity: 'high',
        date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
        notes: '5K run in the park'
      },
      {
        userId: users[0]._id,
        name: 'Gym - Upper Body',
        type: 'strength',
        duration: 60,
        caloriesBurned: 400,
        intensity: 'high',
        date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
        notes: 'Bench press, rows, and shoulder exercises'
      },
      {
        userId: users[0]._id,
        name: 'Yoga Session',
        type: 'flexibility',
        duration: 45,
        caloriesBurned: 150,
        intensity: 'low',
        date: new Date(),
        notes: 'Relaxing yoga flow'
      },
      // Bob's workouts
      {
        userId: users[1]._id,
        name: 'HIIT Training',
        type: 'cardio',
        duration: 25,
        caloriesBurned: 350,
        intensity: 'high',
        date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
        notes: 'High intensity interval training'
      },
      {
        userId: users[1]._id,
        name: 'Cycling',
        type: 'cardio',
        duration: 90,
        caloriesBurned: 600,
        intensity: 'moderate',
        date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
        notes: 'Mountain biking trail'
      },
      // Carol's workouts
      {
        userId: users[2]._id,
        name: 'Long Distance Running',
        type: 'cardio',
        duration: 120,
        caloriesBurned: 1000,
        intensity: 'moderate',
        date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
        notes: 'Half marathon preparation'
      },
      {
        userId: users[2]._id,
        name: 'Swimming',
        type: 'cardio',
        duration: 45,
        caloriesBurned: 400,
        intensity: 'high',
        date: new Date(),
        notes: '2km swim session'
      },
      // David's workouts
      {
        userId: users[3]._id,
        name: 'Gym - Full Body',
        type: 'strength',
        duration: 75,
        caloriesBurned: 450,
        intensity: 'moderate',
        date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
        notes: 'Compound movements and accessories'
      },
      {
        userId: users[3]._id,
        name: 'Basketball Game',
        type: 'sports',
        duration: 60,
        caloriesBurned: 500,
        intensity: 'high',
        date: new Date(),
        notes: 'Friendly match at local court'
      },
      // Emma's workouts
      {
        userId: users[4]._id,
        name: 'Strength Training - Legs',
        type: 'strength',
        duration: 60,
        caloriesBurned: 350,
        intensity: 'high',
        date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
        notes: 'Squats, lunges, and leg press'
      },
      {
        userId: users[4]._id,
        name: 'Pilates Class',
        type: 'flexibility',
        duration: 50,
        caloriesBurned: 200,
        intensity: 'moderate',
        date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
        notes: 'Core strengthening pilates'
      },
      {
        userId: users[4]._id,
        name: 'Jogging',
        type: 'cardio',
        duration: 35,
        caloriesBurned: 280,
        intensity: 'moderate',
        date: new Date(),
        notes: 'Evening jog in the neighborhood'
      }
    ])
    console.log(`✅ Created ${workouts.length} workouts`)
    console.log(`   - ${workouts.filter(w => w.userId.equals(users[0]._id)).length} for Alice`)
    console.log(`   - ${workouts.filter(w => w.userId.equals(users[1]._id)).length} for Bob`)
    console.log(`   - ${workouts.filter(w => w.userId.equals(users[2]._id)).length} for Carol`)
    console.log(`   - ${workouts.filter(w => w.userId.equals(users[3]._id)).length} for David`)
    console.log(`   - ${workouts.filter(w => w.userId.equals(users[4]._id)).length} for Emma`)
    
    // Display statistics
    console.log('\n📊 Database Statistics:')
    const userCount = await User.countDocuments()
    const workoutCount = await Workout.countDocuments()
    const totalCalories = workouts.reduce((sum, w) => sum + w.caloriesBurned, 0)
    const totalDuration = workouts.reduce((sum, w) => sum + w.duration, 0)
    
    console.log(`   📍 Total Users: ${userCount}`)
    console.log(`   🏃 Total Workouts: ${workoutCount}`)
    console.log(`   🔥 Total Calories Burned: ${totalCalories}`)
    console.log(`   ⏱️  Total Workout Duration: ${totalDuration} minutes`)
    console.log(`   📈 Average Workout Duration: ${(totalDuration / workoutCount).toFixed(2)} minutes`)
    
    console.log('\n✨ Database seeding completed successfully!')
    console.log('\n🎯 Sample Credentials:')
    users.forEach((user, index) => {
      console.log(`   ${index + 1}. ${user.name}: ${user.email}`)
    })
    
    // Disconnect from database
    await disconnectDB()
    
  } catch (error) {
    console.error('\n❌ Error seeding database:', error)
    process.exit(1)
  }
}

// Run the seed function
seedDatabase()
