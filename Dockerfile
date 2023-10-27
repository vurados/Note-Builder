FROM node:20.9

WORKDIR /usr/apps/NoteBuilder

ENV NODE_ENV='production'

COPY . .

WORKDIR /Server

RUN npm run install

EXPOSE 3000

CMD ["sh", "-c", "npm run start:dev"]








