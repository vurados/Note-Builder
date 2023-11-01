FROM node:20.9

#WORKDIR /usr/apps/NoteBuilder

ENV NODE_ENV='production'

COPY . .

WORKDIR /client

RUN echo $(ls)

RUN npm ci

RUN npm run build

WORKDIR /server

RUN npm ci

EXPOSE 3000

CMD ["sh", "-c", "npm run start:prod"]








