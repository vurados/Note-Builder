FROM node:18

WORKDIR /apps/NoteBuilder/client

COPY . .

RUN npm run install

RUN npm run build
