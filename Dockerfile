FROM node:20.9

#WORKDIR /usr/apps/NoteBuilder

COPY . .

WORKDIR /client

RUN echo $(ls)

RUN npm ci

ENV NODE_ENV='production'

RUN npm run build

WORKDIR /server

RUN npm ci

EXPOSE 3000

CMD npm run start:prod