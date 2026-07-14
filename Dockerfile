FROM node:22-alpine AS dependencies
WORKDIR /app
COPY package*.json ./
RUN npm ci

FROM dependencies AS build
COPY prisma ./prisma
COPY src ./src
COPY nest-cli.json tsconfig.json ./
RUN npx prisma generate && npm run build

FROM node:22-alpine AS production
WORKDIR /app
ENV NODE_ENV=production

COPY package*.json ./
RUN npm ci --omit=dev && npm cache clean --force
COPY prisma ./prisma
RUN npx prisma generate
COPY --from=build /app/dist ./dist

USER node
EXPOSE 3000
CMD ["sh", "-c", "npx prisma migrate deploy && node dist/prisma/create-admin.js && node dist/src/main.js"]
