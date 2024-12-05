#!/bin/bash

# Kill any processes running on port 5173
lsof -ti:5173 | xargs kill -9 2>/dev/null

# Navigate to frontend directory
cd frontend

# Install dependencies if node_modules doesn't exist
if [ ! -d "node_modules" ]; then
  npm install
fi

# Start the development server
npm run dev 