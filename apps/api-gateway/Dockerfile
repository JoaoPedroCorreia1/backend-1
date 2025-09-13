FROM node:20.11.1-alpine

WORKDIR /app

COPY package.json ./
COPY apps/api-gateway/package.json ./apps/api-gateway/
RUN npm install

COPY *.json ./
COPY *.env ./
COPY libs ./libs
COPY apps/api-gateway ./apps/api-gateway

EXPOSE 3000

CMD ["npm", "run", "start", "api-gateway"]
