#FROM quay.io/lyfe00011/md:beta
#RUN git clone https://github.com/lyfe00011/whatsapp-bot-md.git /root/LyFE/
#WORKDIR /root/LyFE/
#RUN yarn install --network-concurrency 1
#CMD ["npm", "start"]

# Use the official Node.js image
FROM node:14

# Create and set the working directory
WORKDIR /usr/src/app

# Copy package.json and yarn.lock first for better caching
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install

# Copy the rest of the application code
COPY . .

# Expose the port the app runs on (if applicable)
EXPOSE 3000

# Set environment variables if needed
ENV NODE_ENV=production

# Run the app
CMD ["node", "index.js"]

