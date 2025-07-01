FROM node:18 AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .   # ← important pour copier aussi le dossier db/
RUN npm run build

FROM node:18-slim

WORKDIR /app

COPY package*.json ./
RUN npm install --omit=dev

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/db ./db  # ← copie les fichiers SQL

CMD ["sh", "-c", "npm run migrate && npm start"]
