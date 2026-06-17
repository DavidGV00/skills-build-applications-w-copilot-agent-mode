# 🐙 OctoFit Tracker

A modern multi-tier application for fitness tracking, powered by GitHub Copilot Agent Mode.

## Architecture

```
octofit-tracker/
├── frontend/          # React 19 + Vite (Port 5173)
├── backend/           # Node.js + Express + TypeScript (Port 8000)
└── docs/              # Documentation
```

## Prerequisites

- Node.js 18+ and npm
- MongoDB 5.0+ (running on port 27017)
- Git

## Quick Start

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

The frontend will be available at `http://localhost:5173`

### Backend Setup

```bash
cd backend
npm install
cp .env.example .env
npm run dev
```

The backend API will be available at `http://localhost:8000`

### MongoDB Setup

Make sure MongoDB is running:

```bash
# If using Docker
docker run -d -p 27017:27017 --name mongodb mongo:latest

# Or if MongoDB is installed locally
mongod
```

## Technology Stack

### Frontend
- React 19
- Vite
- Modern CSS

### Backend
- Node.js
- Express.js
- TypeScript
- Mongoose (MongoDB ODM)
- CORS support

### Database
- MongoDB

## API Endpoints

- `GET /` - API information
- `GET /api/health` - Health check
- `GET /api/users` - List users (coming soon)
- `GET /api/workouts` - List workouts (coming soon)

## Environment Variables

Create a `.env` file in the backend directory:

```env
PORT=8000
MONGODB_URI=mongodb://localhost:27017/octofit-tracker
NODE_ENV=development
```

## Development

### Frontend Development
```bash
cd frontend
npm run dev      # Start dev server
npm run build    # Build for production
npm run preview  # Preview production build
```

### Backend Development
```bash
cd backend
npm run dev      # Start with hot reload (tsx watch)
npm run build    # Build TypeScript
npm start        # Run compiled JavaScript
```

## License

MIT
