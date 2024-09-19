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

# Final stage
FROM alpine:latest

# Copy the built files from the build stage
COPY --from=build /app/dist /app/expense-tracker

# Verify the copy
RUN ls -la /app/expense-tracker

CMD ["tail", "-f", "/dev/null"]