#!/bin/bash

# Create necessary directories
mkdir -p ../backend/projects
mkdir -p public/icons

# Install dependencies
npm install

# Copy environment files if they don't exist
if [ ! -f .env ]; then
  cp .env.example .env
fi

# Start the development server
npm run dev