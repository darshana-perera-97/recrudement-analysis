# Recruitment Analysis System

A full-stack application for analyzing recruitment and employee data.

## Project Structure

- `frontend/` - React application
- `backend/` - Express.js server with API

## Getting Started

### 1. Install Dependencies

```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### 2. Build the Frontend

```bash
cd frontend
npm run build
```

This creates a `build` folder with the optimized production files.

### 3. Run the Application

```bash
# From the backend directory
cd backend
npm start
```

The server will start on **http://localhost:5055**

## Development Mode

For development with hot reloading:

### Terminal 1 - Backend
```bash
cd backend
npm start
```

### Terminal 2 - Frontend
```bash
cd frontend
npm start
```

The frontend will run on **http://localhost:3000** and proxy API requests to the backend.

## How It Works

- The backend serves both the API endpoints and the React frontend
- All API calls use relative paths (`/api/*`)
- The root route (`/`) serves the React application
- React Router handles client-side routing

## API Endpoints

- `GET /api/users` - Get all users
- `POST /api/users` - Create a new user
- `GET /health` - Health check

## Features

- Dashboard with analytics cards
- Filter by Province, Position, and Designation
- View employees retiring in selected year
- Track vacancies
- Add and manage employee records
- Year-based analysis with slider

