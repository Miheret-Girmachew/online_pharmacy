# Stage 1: Build
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
COPY src/prisma ./src/prisma/
RUN npm install
COPY . .
# Generate Prisma Client and Compile TS
RUN npx prisma generate
RUN npm run build

# Stage 2: Run
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
# Only install production dependencies to keep image small
RUN npm install --only=production
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/src/prisma ./src/prisma

# Expose port
EXPOSE 3000

# Run DB migrations (push) then start app
CMD npx prisma db push && node dist/index.js