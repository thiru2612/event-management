# Use the official Node.js 22 LTS image
FROM node:22-slim

# Install the system dependencies for the canvas package
RUN apt-get update && apt-get install -y \
    build-essential \
    libcairo2-dev \
    libpango1.0-dev \
    libjpeg-dev \
    libgif-dev \
    librsvg2-dev \
    g++

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install --unsafe-perm

# Copy the rest of your application code
COPY . .

# Build the application
RUN npm run build

# Expose the port your application will run on
EXPOSE 8081

# Define the command to start your app
CMD [ "npm", "run", "start" ]