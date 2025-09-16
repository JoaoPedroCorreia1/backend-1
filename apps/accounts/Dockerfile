FROM node:20.11.1-alpine

WORKDIR /app

COPY package.json ./
COPY apps/accounts/package.json ./apps/accounts/
RUN npm install

COPY *.json ./
COPY *.env ./
COPY libs ./libs
COPY apps/accounts ./apps/accounts
COPY apps/accounts/prisma ./prisma

EXPOSE 3001

RUN npx prisma generate

CMD ["npm", "run", "start", "accounts"]
