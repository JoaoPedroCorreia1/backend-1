FROM node:20.11.1-alpine

WORKDIR /app

COPY package.json ./  
COPY apps/child/package.json ./apps/child/

RUN npm install

COPY *.json ./
COPY *.env ./
COPY libs ./libs
COPY apps/child ./apps/child

COPY apps/child/prisma ./prisma
RUN npx prisma generate

EXPOSE 3002

CMD ["npm", "run", "start", "child"]
