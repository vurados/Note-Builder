FROM node:18

WORKDIR /apps/NoteBuilder/server

COPY . .

RUN npm run install

RUN npm run start:prod

EXPOSE 3000

CMD ["sh", "-c", "npm run start:prod"]