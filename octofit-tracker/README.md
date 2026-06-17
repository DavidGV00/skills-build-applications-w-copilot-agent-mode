# 🐙 OctoFit Tracker - Complete Multi-Tier Application

A modern, production-ready fitness tracking application built with GitHub Copilot Agent Mode.

## 🎯 Project Overview

OctoFit Tracker is a full-stack application demonstrating best practices for building scalable applications using:
- **Frontend**: React 19 with Vite (port 5173)
- **Backend**: Express.js with TypeScript (port 8000)
- **Database**: MongoDB with Mongoose (port 27017)

## 📁 Project Structure

```
octofit-tracker/
├── frontend/
│   ├── src/
│   │   ├── App.jsx          # Main React component
│   │   ├── App.css          # Component styles
│   │   ├── main.jsx         # Entry point
│   │   └── index.css        # Global styles
│   ├── index.html           # HTML template
│   ├── vite.config.js       # Vite configuration
│   ├── package.json         # Frontend dependencies
│   └── .gitignore
│
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── database.ts        # MongoDB connection
│   │   ├── middleware/
│   │   │   ├── errorHandler.ts    # Global error handling
│   │   │   ├── logger.ts          # Request logging
│   │   │   └── validation.ts      # Input validation
│   │   ├── models/
│   │   │   ├── User.ts            # User schema
│   │   │   └── Workout.ts         # Workout schema
│   │   ├── routes/
│   │   │   ├── users.ts           # User API endpoints
│   │   │   └── workouts.ts        # Workout API endpoints
│   │   ├── scripts/
│   │   │   ├── seed.ts            # Database seeding
│   │   │   ├── reset.ts           # Database reset
│   │   │   └── README.md          # Script documentation
│   │   ├── utils/
│   │   │   └── validators.ts      # Validation utilities
│   │   ├── index.ts               # Server entry point
│   │   └── README.md              # Backend documentation
│   ├── package.json               # Backend dependencies
│   ├── tsconfig.json              # TypeScript config
│   ├── .env.example               # Environment template
│   └── .gitignore
│
└── README.md                       # This file
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- MongoDB 5.0+
- npm or yarn

### Installation & Setup

#### 1. Start MongoDB
```bash
# Using Docker (recommended)
docker run -d -p 27017:27017 --name octofit-mongodb mongo:latest

# Or if installed locally
mongod
```

#### 2. Backend Setup
```bash
cd octofit-tracker/backend
npm install
cp .env.example .env
npm run seed    # Populate database with sample data
npm run dev     # Start server on port 8000
```

#### 3. Frontend Setup (in new terminal)
```bash
cd octofit-tracker/frontend
npm install
npm run dev     # Start dev server on port 5173
```

#### 4. Access the Application
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:8000
- **API Health**: http://localhost:8000/api/health
- **API Docs**: http://localhost:8000/

## 🔌 API Endpoints

### Base URL
```
http://localhost:8000
```

### Users API
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/users` | Create new user |
| GET | `/api/users` | Get all users |
| GET | `/api/users/:id` | Get user by ID |
| PUT | `/api/users/:id` | Update user |
| DELETE | `/api/users/:id` | Delete user |

### Workouts API
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/workouts` | Create new workout |
| GET | `/api/workouts` | Get all workouts |
| GET | `/api/workouts/:id` | Get workout by ID |
| GET | `/api/workouts/user/:userId` | Get user's workouts |
| GET | `/api/workouts/stats/user/:userId` | Get workout statistics |
| PUT | `/api/workouts/:id` | Update workout |
| DELETE | `/api/workouts/:id` | Delete workout |

## 📊 Sample Data

### Users (5 total)
After running `npm run seed`, the database includes:
- Alice Johnson (Muscle Gain)
- Bob Smith (Weight Loss)
- Carol Davis (Endurance)
- David Wilson (General Fitness)
- Emma Taylor (Muscle Gain)

### Workouts (12 total)
- Cardio: Running, Cycling, Swimming
- Strength: Gym sessions, Leg training
- Flexibility: Yoga, Pilates
- Sports: Basketball

### Statistics
- Total Calories Burned: 4,630 kcal
- Total Duration: 538 minutes
- Average Workout Duration: 44.83 minutes

## 💾 Database Management

### Seed Database
```bash
cd backend
npm run seed
```
Populates database with 5 sample users and 12 sample workouts.

### Reset Database
```bash
cd backend
npm run reset
```
⚠️ **Warning**: Permanently deletes all data.

## 📦 Dependencies

### Frontend
- React 19
- React DOM 19
- Vite 5

### Backend
- Express 4.18.2
- Mongoose 7.0.0
- TypeScript 5.0.0
- CORS 2.8.5
- dotenv 16.0.3

### Development Tools
- tsx (TypeScript executor)
- @types/express
- @types/node

## 🔒 Environment Variables

Create a `.env` file in the backend directory:

```env
# Server Configuration
PORT=8000
NODE_ENV=development

# Database Configuration
MONGODB_URI=mongodb://localhost:27017/octofit-tracker

# CORS Configuration
CORS_ORIGIN=http://localhost:5173
```

## 🧪 Testing Endpoints

### Create a User
```bash
curl -X POST http://localhost:8000/api/users \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Jane Doe",
    "email": "jane@example.com",
    "age": 30,
    "weight": 65,
    "height": 165,
    "goal": "weight_loss"
  }'
```

### Get All Users
```bash
curl http://localhost:8000/api/users
```

### Create a Workout
```bash
# Replace USER_ID with actual user ID from previous request
curl -X POST http://localhost:8000/api/workouts \
  -H "Content-Type: application/json" \
  -d '{
    "userId": "USER_ID",
    "name": "Morning Run",
    "type": "cardio",
    "duration": 30,
    "caloriesBurned": 300,
    "intensity": "high",
    "notes": "5K run in the park"
  }'
```

### Get User Statistics
```bash
# Replace USER_ID with actual user ID
curl http://localhost:8000/api/workouts/stats/user/USER_ID
```

## 🛠️ Development Commands

### Frontend
```bash
cd frontend
npm run dev      # Start dev server
npm run build    # Build for production
npm run preview  # Preview production build
```

### Backend
```bash
cd backend
npm run dev      # Start with hot reload (tsx watch)
npm run build    # Build TypeScript to JavaScript
npm start        # Run compiled JavaScript
npm run seed     # Populate database
npm run reset    # Clear database
```

## 📚 Architecture & Best Practices

### Backend Architecture
- **Models**: Type-safe Mongoose schemas with validation
- **Routes**: RESTful API design with proper HTTP methods
- **Middleware**: Error handling, request logging, input validation
- **Config**: Centralized database configuration
- **Utils**: Reusable validation and utility functions

### Features
- ✅ Full CRUD operations for users and workouts
- ✅ Database population with realistic seed data
- ✅ Request logging with duration tracking
- ✅ Global error handling
- ✅ Input validation for all endpoints
- ✅ Workout statistics aggregation
- ✅ User-workout relationship management
- ✅ CORS support for frontend
- ✅ TypeScript for type safety

## 🔗 GitHub Copilot Agent Mode

This project was built using GitHub Copilot Agent Mode, demonstrating:
- Intelligent code generation
- Best practices implementation
- Production-ready code structure
- Comprehensive error handling
- Type-safe TypeScript development

## 📖 Documentation

- [Backend README](octofit-tracker/backend/README.md) - Detailed backend documentation
- [Scripts README](octofit-tracker/backend/src/scripts/README.md) - Database scripts documentation

## 🐛 Troubleshooting

### MongoDB Connection Error
```
❌ MongoDB connection error
```
**Solution**: Ensure MongoDB is running:
```bash
docker run -d -p 27017:27017 --name octofit-mongodb mongo:latest
# or
mongod
```

### Port Already in Use
```
Error: listen EADDRINUSE :::8000
```
**Solution**: Kill the process using the port or change PORT in .env

### Module Not Found
```
Error: Cannot find module 'express'
```
**Solution**: Install dependencies:
```bash
cd backend
npm install
```

## 🚀 Deployment

### Production Build
```bash
# Frontend
cd frontend
npm run build

# Backend
cd ../backend
npm run build
```

### Docker Support (Coming Soon)
- Docker configuration files
- Docker Compose for multi-container setup
- Production-ready environment

## 📝 License

MIT

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📞 Support

For issues or questions, please open an issue on GitHub or check the [Skills Repository](https://github.com/skills/build-applications-w-copilot-agent-mode).

---

**Built with ❤️ using GitHub Copilot Agent Mode**
