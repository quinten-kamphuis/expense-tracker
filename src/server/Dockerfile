# Use the official Bun image
FROM oven/bun:latest

# Set the working directory in the container
WORKDIR /app

# If you have a bun.lockb file, copy it as well
COPY bun.lockb .

# Install dependencies if you have any
RUN bun install

# Copy the entire server directory
COPY . .

# Expose the port the app runs on
EXPOSE 3000

# Run the app
CMD ["bun", "run", "index.ts"]