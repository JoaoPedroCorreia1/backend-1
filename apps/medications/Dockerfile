FROM node:20.11.1-alpine

WORKDIR /app

COPY package.json ./
COPY apps/medications/package.json ./apps/medications/
RUN npm install

COPY *.json ./
COPY *.env ./
COPY libs ./libs
COPY apps/medications ./apps/medications
COPY apps/medications/prisma ./prisma

EXPOSE 3005

RUN npx prisma generate

CMD ["npm", "run", "start", "medications"]
