# FROM node:18
# WORKDIR /app
# COPY package*.json ./
# RUN npm install
# COPY . .
# EXPOSE 5000

# CMD ["npm", "run", "start:prod"]

# Stage 1: Build
FROM node:18 AS builder
WORKDIR /build

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build   # generates dist/

# Stage 2: Run
FROM node:18
WORKDIR /app

COPY --from=builder /build/package*.json ./
COPY --from=builder /build/node_modules ./node_modules
COPY --from=builder /build/dist ./dist

CMD ["node", "dist/main.js"]
