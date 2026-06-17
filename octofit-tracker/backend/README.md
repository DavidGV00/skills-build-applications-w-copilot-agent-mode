# 🐙 OctoFit Tracker Backend

A robust Express.js backend API for the OctoFit Tracker fitness application, built with TypeScript and MongoDB.

## 🏗️ Architecture

```
src/
├── config/          # Configuration files
├── middleware/      # Custom middleware
├── models/          # MongoDB Mongoose schemas
├── routes/          # API route handlers
└── index.ts         # Application entry point
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- MongoDB 5.0+
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Start MongoDB (if not already running)
docker run -d -p 27017:27017 --name mongodb mongo:latest

# Start the server in development mode
npm run dev
```

The API will be available at `http://localhost:8000`

## 📦 Dependencies

### Runtime
- **express** - Web framework
- **mongoose** - MongoDB ODM
- **cors** - Cross-Origin Resource Sharing
- **dotenv** - Environment variables

### Development
- **typescript** - Type safety
- **@types/express** - Express type definitions
- **@types/node** - Node.js type definitions
- **tsx** - TypeScript executor with hot reload

## 🛣️ API Endpoints

### Base URL
```
http://localhost:8000
```

### Health & Info
- `GET /` - API information and available endpoints
- `GET /api/health` - Health check endpoint

### Users
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/users` | Create a new user |
| GET | `/api/users` | Get all users |
| GET | `/api/users/:id` | Get user by ID |
| PUT | `/api/users/:id` | Update user |
| DELETE | `/api/users/:id` | Delete user |

### Workouts
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/workouts` | Create a new workout |
| GET | `/api/workouts` | Get all workouts |
| GET | `/api/workouts/:id` | Get workout by ID |
| GET | `/api/workouts/user/:userId` | Get workouts by user |
| GET | `/api/workouts/stats/user/:userId` | Get workout statistics |
| PUT | `/api/workouts/:id` | Update workout |
| DELETE | `/api/workouts/:id` | Delete workout |

## 📋 User Model

```typescript
{
  name: string (required),
  email: string (required, unique),
  age?: number,
  weight?: number,
  height?: number,
  goal?: 'weight_loss' | 'muscle_gain' | 'endurance' | 'general_fitness',
  createdAt: Date,
  updatedAt: Date
}
```

### Example: Create User
```bash
curl -X POST http://localhost:8000/api/users \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "age": 30,
    "weight": 75,
    "height": 180,
    "goal": "muscle_gain"
  }'
```

## 💪 Workout Model

```typescript
{
  userId: ObjectId (required),
  name: string (required),
  type: 'cardio' | 'strength' | 'flexibility' | 'sports' | 'other' (required),
  duration: number (required, 1-600 minutes),
  caloriesBurned: number (required, >= 0),
  intensity: 'low' | 'moderate' | 'high' (required),
  date: Date,
  notes?: string,
  createdAt: Date,
  updatedAt: Date
}
```

### Example: Create Workout
```bash
curl -X POST http://localhost:8000/api/workouts \
  -H "Content-Type: application/json" \
  -d '{
    "userId": "user_id_here",
    "name": "Morning Run",
    "type": "cardio",
    "duration": 30,
    "caloriesBurned": 300,
    "intensity": "high",
    "notes": "5k run in the park"
  }'
```

## 📊 Workout Statistics

Get aggregated workout statistics for a user:

```bash
curl http://localhost:8000/api/workouts/stats/user/:userId
```

Response:
```json
{
  "success": true,
  "data": {
    "totalWorkouts": 5,
    "totalDuration": 150,
    "totalCaloriesBurned": 1500,
    "averageIntensity": "moderate",
    "intensityBreakdown": {
      "low": 1,
      "moderate": 3,
      "high": 1
    }
  }
}
```

## 🔧 Development Scripts

```bash
# Development with hot reload
npm run dev

# Build TypeScript
npm run build

# Run compiled JavaScript
npm start

# Lint code
npm run lint
```

## 🏗️ Project Structure

### Models
- **User** (`src/models/User.ts`) - User schema with profile information
- **Workout** (`src/models/Workout.ts`) - Workout schema with exercise details

### Routes
- **users** (`src/routes/users.ts`) - CRUD operations for users
- **workouts** (`src/routes/workouts.ts`) - CRUD operations for workouts + statistics

### Middleware
- **errorHandler** (`src/middleware/errorHandler.ts`) - Error handling and async wrapper
- **logger** (`src/middleware/logger.ts`) - Request logging
- **validation** (`src/middleware/validation.ts`) - Input validation

### Configuration
- **database** (`src/config/database.ts`) - MongoDB connection setup

## 📝 Environment Variables

Create a `.env` file in the root directory:

```env
# Server
PORT=8000
NODE_ENV=development

# Database
MONGODB_URI=mongodb://localhost:27017/octofit-tracker

# CORS
CORS_ORIGIN=http://localhost:5173
```

## 🧪 Testing Endpoints

### Create a User
```bash
curl -X POST http://localhost:8000/api/users \
  -H "Content-Type: application/json" \
  -d '{"name":"Jane Doe","email":"jane@example.com"}'
```

### Get All Users
```bash
curl http://localhost:8000/api/users
```

### Create a Workout (replace USER_ID)
```bash
curl -X POST http://localhost:8000/api/workouts \
  -H "Content-Type: application/json" \
  -d '{
    "userId":"USER_ID",
    "name":"Gym Session",
    "type":"strength",
    "duration":60,
    "caloriesBurned":500,
    "intensity":"high"
  }'
```

## 📚 Learn More

- [Express.js Documentation](https://expressjs.com/)
- [Mongoose Documentation](https://mongoosejs.com/)
- [TypeScript Documentation](https://www.typescriptlang.org/)
- [MongoDB Documentation](https://docs.mongodb.com/)

## 📄 License

MIT
