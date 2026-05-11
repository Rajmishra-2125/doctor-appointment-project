FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install only production dependencies
RUN npm ci --only=production

# Copy application source
COPY . .

# Expose the API port
EXPOSE 8000

# Start the application using Node (or PM2 if installed globally in the container)
CMD ["npm", "run", "start"]
