# Use an official Node runtime as a parent image
FROM node:20-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN bun install

# Copy the current directory contents into the container
COPY . .

# Build the app
RUN bun run build

# Install a simple http server for serving static content
RUN bun install -g http-server

# Make port 8080 available to the world outside this container
EXPOSE 8080

# Run the app when the container launches
CMD ["http-server", "dist", "-p", "8080"]