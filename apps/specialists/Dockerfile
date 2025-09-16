FROM node:20.11.1-alpine

WORKDIR /app

COPY package.json ./  
COPY apps/specialists/package.json ./apps/specialists/

RUN npm install

COPY *.json ./
COPY *.env ./
COPY libs ./libs
COPY apps/specialists ./apps/specialists

COPY apps/specialists/prisma ./prisma
RUN npx prisma generate

EXPOSE 3006

CMD ["npm", "run", "start", "specialists"]
