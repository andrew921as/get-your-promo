# Use Playwright's Docker image as the base image
FROM mcr.microsoft.com/playwright:v1.43.1-jammy

# Set the working directory in the Docker container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install the project dependencies
RUN npm install

# Copy the rest of the project files to the working directory
COPY . .

# Expose the port the app runs on
EXPOSE 3001

# Define the command to run the app
CMD [ "node", "index.js" ]