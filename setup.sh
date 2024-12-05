#!/bin/bash

echo "Setting up AI Chron..."

# Install frontend dependencies
echo "Installing frontend dependencies..."
cd frontend
npm install

# Install backend dependencies
echo "Installing backend dependencies..."
cd ../backend
npm install

echo "Setup complete!"
echo "To start the application, run:"
echo "npm run dev # in the frontend directory"
echo "npm start  # in the backend directory" 