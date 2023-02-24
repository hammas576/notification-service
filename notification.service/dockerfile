FROM node:19.0.0-alpine3.16 
WORKDIR /files
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build
CMD [ "npm", "run", "start" ]