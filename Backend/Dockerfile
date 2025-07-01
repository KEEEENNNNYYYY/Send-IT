# Étape 1 : Build TypeScript
FROM node:18 AS build

# Crée un dossier pour bosser dedans
WORKDIR /app

# Copie les fichiers nécessaires
COPY package*.json ./
RUN npm install

# Copie le reste (src, tsconfig, etc.)
COPY . .

# Compile le code TypeScript
RUN npm run build

# Étape 2 : Image légère pour exécuter uniquement le JS compilé
FROM node:18-slim

# Crée un dossier propre dans l’image finale
WORKDIR /app

# Copie seulement le JS compilé et les fichiers nécessaires
COPY --from=build /app/package*.json ./
COPY --from=build /app/dist ./dist
RUN npm install --omit=dev

# Définit la commande de démarrage
CMD ["node", "dist/index.js"]
