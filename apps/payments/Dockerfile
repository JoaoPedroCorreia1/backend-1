FROM node:20.11.1-alpine

WORKDIR /app

COPY package.json ./  
COPY apps/payments/package.json ./apps/payments/

RUN npm install

COPY *.json ./
COPY *.env ./
COPY libs ./libs
COPY apps/payments ./apps/payments

COPY apps/payments/prisma ./prisma
RUN npx prisma generate

EXPOSE 3008

CMD ["npm", "run", "start", "payments"]
