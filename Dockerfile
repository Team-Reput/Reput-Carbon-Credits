# Step 1: Use Node.js image for the build stage
FROM node:18 AS build-stage

# Set the working directory inside the container
WORKDIR /app

# Copy package files and install dependencies
COPY package.json package-lock.json ./
RUN npm install --legacy-peer-deps  

# Copy the entire project
COPY . .
 
# Build the Angular app
RUN npm run build -- --configuration=test --base-href=/
# RUN npm run build -- --configuration=production --base-href=/

# Step 2: Use Node.js image for the runtime stage
FROM node:18 AS runtime-stage

# Set the working directory inside the container
WORKDIR /app

# Copy the build output from the build stage
COPY --from=build-stage /app/dist/reput-carbon/browser /app/dist/browser

# Install a lightweight HTTP server
RUN npm install -g http-server

# Rename 'index.csr.html' to 'index.html' if it exists
RUN [ -f /app/dist/browser/index.csr.html ] && mv /app/dist/browser/index.csr.html /app/dist/browser/index.html || echo "index.csr.html not found, skipping rename"

# Expose the port the app runs on
EXPOSE 4200

# Start the application and serve the browser files
CMD ["http-server", "/app/dist/browser", "-p", "4200"]
