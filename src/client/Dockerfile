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

FROM alpine:latest
COPY --from=build /app/dist /var/www/expense-tracker
CMD ["tail", "-f", "/dev/null"]