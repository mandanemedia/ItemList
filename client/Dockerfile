# Grab the base image and install bash
FROM node:14-alpine
RUN apk add bash

# copy frontend and install the packages
WORKDIR /app
COPY ./package.json ./package-lock.json ./
RUN npm install

# copy the rest of frontend
COPY . .

#RUN npm run-script start
CMD ["npm", "start"]