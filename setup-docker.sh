#!/bin/bash

echo "Setting up Docker environment..."

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo "Docker is not running. Please start Docker and try again."
    exit 1
fi

# Build and start containers
echo "Building and starting containers..."
docker-compose up --build -d

echo "Setup complete! Services are running at:"
echo "Frontend: http://localhost:5173"
echo "Backend: http://localhost:3000"
echo "AI Service: http://localhost:8000" 