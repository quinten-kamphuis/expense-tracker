# Use the official image as a parent image
FROM oven/bun:1.1-slim as build

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN bun install

# Copy the current directory contents into the container
COPY . .

# Linting and type-checking
RUN bun run lint
RUN bun run type-check

# Build the app
RUN bun run build

# Final stage
FROM alpine:latest

# Copy the built files from the build stage
COPY --from=build /app/dist /app/expense-tracker

# Verify the copy
RUN ls -la /app/expense-tracker

CMD ["tail", "-f", "/dev/null"]