FROM node:20.11.1-alpine

WORKDIR /app

COPY package.json ./  
COPY apps/clinics/package.json ./apps/clinics/

RUN npm install

COPY *.json ./
COPY *.env ./
COPY libs ./libs
COPY apps/clinics ./apps/clinics

COPY apps/clinics/prisma ./prisma
RUN npx prisma generate

EXPOSE 3004

CMD ["npm", "run", "start", "clinics"]
