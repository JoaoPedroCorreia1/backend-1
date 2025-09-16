FROM node:20.11.1-alpine

WORKDIR /app

COPY package.json ./  
COPY apps/subscription-plans/package.json ./apps/subscription-plans/

RUN npm install

COPY *.json ./
COPY *.env ./
COPY libs ./libs
COPY apps/subscription-plans ./apps/subscription-plans

COPY apps/subscription-plans/prisma ./prisma
RUN npx prisma generate

EXPOSE 3009

CMD ["npm", "run", "start", "subscription-plans"]
