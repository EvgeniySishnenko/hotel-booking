FROM node:14.17.0

WORKDIR /app

COPY . .

RUN npm ci


EXPOSE 8000


CMD ["npm", "start"]
