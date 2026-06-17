import express, { Express, Request, Response } from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { connectDB } from './config/database'
import { requestLogger } from './middleware/logger'
import { errorHandler } from './middleware/errorHandler'
import userRoutes from './routes/users'
import workoutRoutes from './routes/workouts'

dotenv.config()

const app: Express = express()
const PORT = process.env.PORT || 8000

// Middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(requestLogger)

// Connect to MongoDB
connectDB()

// Health Check Route
app.get('/api/health', (req: Request, res: Response) => {
  res.json({
    status: 'healthy',
    message: 'OctoFit Tracker API is running',
    port: PORT,
    mongodb: MONGODB_URI,
    frontend: 'http://localhost:5173',
    timestamp: new Date().toISOString()
  })
})

// Root Route
app.get('/', (req: Request, res: Response) => {
  res.json({
    message: '🐙 OctoFit Tracker Backend API',
    version: '0.0.1',
    endpoints: {
      health: '/api/health',
      users: {
        create: 'POST /api/users',
        getAll: 'GET /api/users',
        getById: 'GET /api/users/:id',
        update: 'PUT /api/users/:id',
        delete: 'DELETE /api/users/:id'
      },
      workouts: {
        create: 'POST /api/workouts',
        getAll: 'GET /api/workouts',
        getById: 'GET /api/workouts/:id',
        getByUser: 'GET /api/workouts/user/:userId',
        getStats: 'GET /api/workouts/stats/user/:userId',
        update: 'PUT /api/workouts/:id',
        delete: 'DELETE /api/workouts/:id'
      }
    }
  })
})

// API Routes
app.use('/api/users', userRoutes)
app.use('/api/workouts', workoutRoutes)

// 404 Handler
app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} not found`,
    availableRoutes: 'GET /'
  })
})

// Error Handler
app.use(errorHandler)

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit-tracker'

// Start Server
app.listen(PORT, () => {
  console.log(`\n🚀 Server running at http://localhost:${PORT}`)
  console.log(`📚 API Documentation: http://localhost:${PORT}/`)
  console.log(`🏥 Health Check: http://localhost:${PORT}/api/health`)
  console.log(`🌐 Frontend available at http://localhost:5173`)
  console.log('\n📝 Available endpoints:')
  console.log('   POST   /api/users')
  console.log('   GET    /api/users')
  console.log('   GET    /api/users/:id')
  console.log('   PUT    /api/users/:id')
  console.log('   DELETE /api/users/:id')
  console.log('   POST   /api/workouts')
  console.log('   GET    /api/workouts')
  console.log('   GET    /api/workouts/:id')
  console.log('   GET    /api/workouts/user/:userId')
  console.log('   GET    /api/workouts/stats/user/:userId')
  console.log('   PUT    /api/workouts/:id')
  console.log('   DELETE /api/workouts/:id\n')
})

export default app
