# Use the official image as a parent image
FROM oven/bun:latest as build

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

# Use a lightweight base image for the final stage
FROM alpine:latest

# Create the directory for the built files
RUN mkdir -p /app/dist

# Copy the built files from the build stage
COPY --from=build /app/dist /app/dist

# List contents of the target directory to verify copy
RUN ls -la /app/dist

# Keep the container running
CMD ["tail", "-f", "/dev/null"]