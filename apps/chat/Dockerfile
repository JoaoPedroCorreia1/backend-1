# Use a imagem oficial do Node.js como base
FROM node:20.11.1-alpine

WORKDIR /app

COPY package.json ./  
COPY apps/chat/package.json ./apps/chat/

RUN npm install

COPY *.json ./
COPY *.env ./
COPY libs ./libs
COPY apps/chat ./apps/chat

COPY apps/chat/prisma ./prisma
RUN npx prisma generate

EXPOSE 3001

CMD ["npm", "run", "start", "chat"]
