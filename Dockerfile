# Use the official Bun image
FROM oven/bun:1.1-slim

# Set the working directory in the container
WORKDIR /app

# Copy the entire server directory
COPY . .

# Install dependencies if you have any
RUN bun install
RUN bun run type-check

# Expose the port the app runs on
EXPOSE 3000

# Set the working directory to the server folder
WORKDIR /app/src/server

# Run the app
CMD ["bun", "run", "index.ts"]