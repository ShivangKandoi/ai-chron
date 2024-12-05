FROM node:16-alpine

# Install Python
RUN apk add --no-cache python3 py3-pip

# Install Java
RUN apk add --no-cache openjdk11

# Install C++ build tools
RUN apk add --no-cache build-base

WORKDIR /app

COPY . .

CMD ["node", "src/index.js"] 