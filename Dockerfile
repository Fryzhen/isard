FROM node:22-alpine AS build
WORKDIR /app
COPY package.json ./
RUN npm install --no-audit --no-fund
COPY . .
RUN npx ng build

FROM node:22-alpine
WORKDIR /app
COPY package.json ./
# ponytail: installe aussi les deps Angular (rangées en dependencies), image plus lourde ; passer Angular en devDependencies si la taille gêne
RUN npm install --omit=dev --no-audit --no-fund
COPY server ./server
COPY --from=build /app/dist ./dist
EXPOSE 3000
CMD ["node", "server/app.js"]
