
# Use Node.js version 20 on Alpine Linux (small, lightweight base image)
FROM node:20-alpine

# Set working directory inside the container to /app
WORKDIR /app

# Copy only package.json and package-lock.json first (for better caching)
COPY package*.json ./

# Install only production dependencies (no devDependencies)
RUN npm install --production

# Copy all remaining source code into the container
COPY . .

# Document that the app listens on port 5000 (metadata for Docker)
EXPOSE 5000

# Set the default command to run the app in production mode
CMD ["npm", "start"]

# Hernan's dev mode
# # Stable Node image
# FROM node:20

# # Working directory inside the container
# WORKDIR /app

# # Copy package files first (for layer caching)
# COPY package*.json ./

# # Install dependencies
# RUN npm install

# # Copy the entire backend project into the container
# COPY . .

# # Expose the backend port (adjust if you use a different port)
# EXPOSE 3000

# # Start the app (adjust if the start script is different)
# CMD ["npm", "run", "dev"]
