FROM node:18 AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

# DEBUG: afficher ce qu’il y a dans dist
RUN ls -la dist

# Étape finale : image minimaliste
FROM node:18-slim

WORKDIR /app

COPY package*.json ./
RUN npm install --omit=dev

COPY --from=builder /app/dist ./dist

CMD ["sh", "-c", "npm run migrate && node dist/index.js"]
