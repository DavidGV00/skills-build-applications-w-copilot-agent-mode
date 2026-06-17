import express, { Express, Request, Response } from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

const app: Express = express()
const PORT = process.env.PORT || 8000
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit-tracker'

// Middleware
app.use(cors())
app.use(express.json())

// MongoDB Connection
mongoose.connect(MONGODB_URI)
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch((err) => console.error('❌ MongoDB connection error:', err))

// Health Check Route
app.get('/api/health', (req: Request, res: Response) => {
  res.json({
    status: 'healthy',
    message: 'OctoFit Tracker API is running',
    port: PORT,
    mongodb: 'mongodb://localhost:27017',
    frontend: 'http://localhost:5173'
  })
})

// Root Route
app.get('/', (req: Request, res: Response) => {
  res.json({
    message: '🐙 OctoFit Tracker Backend API',
    version: '0.0.1',
    endpoints: {
      health: '/api/health',
      users: '/api/users',
      workouts: '/api/workouts'
    }
  })
})

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`)
  console.log(`📦 MongoDB connection: ${MONGODB_URI}`)
  console.log(`🌐 Frontend available at http://localhost:5173`)
})
