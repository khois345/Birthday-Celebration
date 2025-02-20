FROM node:18.18.0

# Create app directory
WORKDIR /app

# Copy package.json and package-lock.json files to the working directory
COPY package*.json  ./

# Install app dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the application
RUN npm run build

# Expose the port the app runs on
EXPOSE 3000

# Set the environment variable to production
ENV NODE_ENV=production

# Start the Next.js app
CMD ["npm", "run", "start"]