# Stage 1: Build
FROM node:18 AS builder
WORKDIR /app

COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build   # generates /app/dist

# Stage 2: Run
FROM node:18 AS runner
WORKDIR /app

COPY package*.json ./
RUN npm install --only=production

COPY --from=builder /app/dist ./dist

EXPOSE 5000
CMD ["npm", "run", "start:prod"]
