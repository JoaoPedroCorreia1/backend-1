FROM node:20.11.1-alpine

WORKDIR /app

COPY package.json ./
COPY apps/parents/package.json ./apps/parents/
RUN npm install

COPY *.json ./
COPY *.env ./
COPY libs ./libs
COPY apps/parents ./apps/parents
COPY apps/parents/prisma ./prisma

EXPOSE 3001

RUN npx prisma generate

CMD ["npm", "run", "start", "parents"]
