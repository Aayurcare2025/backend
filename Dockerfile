# Stage 1: Build
FROM node:18 AS builder
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy source and build
COPY . .
RUN npm run build   # should create /app/dist

# Stage 2: Run
FROM node:18 AS runner
WORKDIR /app

# Copy only production dependencies
COPY package*.json ./
RUN npm install --only=production

# Copy build output from builder
COPY --from=builder /app/dist ./dist

EXPOSE 5000
CMD ["npm", "run", "start:prod"]
