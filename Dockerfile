FROM node:latest

WORKDIR /usr/apps/NoteBuilder

ENV NODE_ENV='production'

COPY . .

RUN npm install

RUN npm run build

WORKDIR /Server

RUN npm run install

EXPOSE 3000

CMD ["sh", "-c", "npm run start:dev"]








