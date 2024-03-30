# Step 1: Build the React app in a Node environment
FROM node:16-alpine as build

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy the rest of the app's source code
COPY . .

# Build the app for production
RUN npm run build

# Step 2: Serve the app using Nginx
FROM nginx:alpine

# Copy the build artifacts from the build stage to the Nginx server
COPY --from=build /app/build /usr/share/nginx/html

# Copy the Nginx configuration (optional)
# COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80 to the outside once the container has launched
EXPOSE 80

# Start Nginx and keep it running in the foreground
CMD ["nginx", "-g", "daemon off;"]
