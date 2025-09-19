# Stage 1 - Build
# Stage 1
FROM node:20 as builder
WORKDIR /build
COPY package*.json ./
RUN npm install
COPY . .  
RUN npm run build

# Stage 2 - Run
FROM node:20 AS runner
WORKDIR /app
COPY --from=builder /build/package*.json ./
COPY --from=builder /build/node_modules ./node_modules
COPY --from=builder /build/dist ./dist
EXPOSE 5000
CMD ["npm", "run", "start:prod"]
