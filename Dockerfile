FROM node:latest
EXPOSE 8080
WORKDIR ./project/js

#RUN  apt-get update && apt-get install -y wait-for-it

COPY package*.json ./
RUN npm ci

COPY . .


#CMD ["wait-for-it", "${process.env.MYSQL_DB_HOST}:3306", "--", "node", "index.js"]
ENTRYPOINT ["node", "index.js"]

