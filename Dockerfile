FROM node:14.16.0-alpine3.13
RUN addgroup app && adduser -S -G app app
USER app
WORKDIR /app/
COPY . .
RUN npm install
CMD ["npm", "start"]