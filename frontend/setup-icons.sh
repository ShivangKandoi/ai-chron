#!/bin/bash

# Create the icons directory if it doesn't exist
mkdir -p public/icons

# List of required icons
icons=("react" "nodejs" "mongodb" "docker" "python" "typescript")

# Check if all icons exist
for icon in "${icons[@]}"
do
  if [ ! -f "public/icons/$icon.svg" ]; then
    echo "Warning: $icon.svg is missing"
  else
    echo "Found: $icon.svg"
  fi
done 