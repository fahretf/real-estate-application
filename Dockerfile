FROM node:latest

WORKDIR ./project/js

RUN apt-get update && apt-get install -y wait-for-it

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 8080
CMD ["wait-for-it", "${process.env.MYSQL_DB_HOST}:3306", "--", "node", "index.js"]

