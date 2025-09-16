FROM node:20.11.1-alpine

WORKDIR /app

COPY package.json ./  
COPY apps/reports/package.json ./apps/reports/

RUN npm install

COPY *.json ./
COPY *.env ./
COPY libs ./libs
COPY apps/reports ./apps/reports

COPY apps/reports/prisma ./prisma
RUN npx prisma generate

EXPOSE 3007

CMD ["npm", "run", "start", "reports"]
