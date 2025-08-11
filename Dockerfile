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