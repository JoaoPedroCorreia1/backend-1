# Use a imagem oficial do Node.js como base
FROM node:20.11.1-alpine

WORKDIR /app

COPY package.json ./  
COPY apps/notification/package.json ./apps/notification/

RUN npm install

COPY *.json ./
COPY *.env ./
COPY libs ./libs
COPY apps/notification ./apps/notification

COPY apps/notification/prisma ./prisma
RUN npx prisma generate

EXPOSE 3001

CMD ["npm", "run", "start", "notification"]
