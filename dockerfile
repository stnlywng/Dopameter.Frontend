# Step 1: Use an official Node.js image as a base
FROM node:16-alpine AS build

# Step 2: Create a non-root user and group
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

# Step 3: Set the working directory in the container
WORKDIR /app

# Step 4: Copy package.json and package-lock.json to the working directory
COPY package.json package-lock.json ./

# Step 5: Change ownership of the working directory to the non-root user
RUN chown -R appuser:appgroup /app

# Step 6: Switch to the non-root user
USER appuser

# Step 7: Install project dependencies
RUN npm install

# Step 8: Copy the rest of the application files
COPY --chown=appuser:appgroup . .

EXPOSE 5173

# Step 9: Start the Vite development server
CMD ["npm", "run", "dev"]
