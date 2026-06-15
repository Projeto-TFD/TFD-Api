FROM node:22-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN npm install

FROM node:22-alpine AS dev
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npx prisma generate
EXPOSE 3000
CMD ["sh", "-c", "npx prisma migrate deploy && npm run start:dev"]
