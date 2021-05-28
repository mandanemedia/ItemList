# Grab DataBase Migration Image
ARG MIGRATE_VERSION=v4.13.0
FROM migrate/migrate:${MIGRATE_VERSION} as migrate_image

# Grab the base image and install bash
FROM node:14-alpine
RUN apk add bash

# migrations
RUN mkdir -p ./db
COPY db /db
COPY entrypoint.sh /
COPY --from=migrate_image /usr/local/bin/migrate /migrate

# set persmision
RUN chmod +x /migrate
RUN chmod +x /entrypoint.sh

# copy backend and install the packages
WORKDIR /app
RUN mkdir -p src
COPY ./package.json ./package-lock.json ./tsconfig.json  ./
RUN npm install

# copy the main backend code and export typescript into js
COPY ./src ./src
RUN npm run build

CMD ["/entrypoint.sh"]