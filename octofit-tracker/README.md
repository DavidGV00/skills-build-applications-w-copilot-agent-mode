# 🐙 OctoFit Tracker

A modern multi-tier fitness tracking application built with React 19, Node.js, Express, and MongoDB.

## Architecture

### Frontend
- **Framework**: React 19
- **Build Tool**: Vite
- **Port**: 5173
- **Directory**: `octofit-tracker/frontend`

### Backend
- **Runtime**: Node.js
- **Framework**: Express
- **Language**: TypeScript
- **Port**: 8000
- **Directory**: `octofit-tracker/backend`

### Database
- **Type**: MongoDB
- **Port**: 27017
- **URI**: `mongodb://localhost:27017/octofit-tracker`

## Getting Started

### Prerequisites
- Node.js (v18+)
- npm or yarn
- MongoDB running locally or accessible remotely

### Setup

1. **Frontend Setup**
```bash
cd octofit-tracker/frontend
npm install
npm run dev
```
Frontend will be available at `http://localhost:5173`

2. **Backend Setup**
```bash
cd octofit-tracker/backend
npm install
cp .env.example .env
npm run dev
```
Backend API will be available at `http://localhost:8000`

3. **Verify MongoDB Connection**
```bash
curl http://localhost:8000/health
```

## Available Scripts

### Frontend
- `npm run dev` - Start development server (port 5173)
- `npm run build` - Build for production
- `npm run preview` - Preview production build

### Backend
- `npm run dev` - Start development server with hot reload (port 8000)
- `npm run build` - Compile TypeScript to JavaScript
- `npm start` - Run compiled backend
- `npm run lint` - Run ESLint

## API Endpoints

- `GET /` - Welcome message
- `GET /health` - Health check

## Project Structure

```
octofit-tracker/
├── frontend/
│   ├── src/
│   │   ├── main.jsx
│   │   ├── App.jsx
│   │   ├── App.css
│   │   └── index.css
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
├── backend/
│   ├── src/
│   │   ├── index.ts
│   │   └── models/
│   │       ├── User.ts
│   │       └── Workout.ts
│   ├── package.json
│   ├── tsconfig.json
│   └── .env.example
└── README.md
```

## Technologies

- React 19
- Vite
- Node.js
- Express
- TypeScript
- MongoDB
- Mongoose
- CORS

## License

MIT
