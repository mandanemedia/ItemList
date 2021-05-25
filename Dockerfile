# Grab DataBase Migration Image
ARG MIGRATE_VERSION=v4.13.0
FROM migrate/migrate:${MIGRATE_VERSION} as migrate_image

FROM node:14-alpine
RUN apk add bash
COPY . .

# migrations
RUN mkdir -p ./db
COPY ./api/db /db
COPY ./entrypoint.sh /
COPY --from=migrate_image /usr/local/bin/migrate /migrate

#set persmision
RUN chmod +x /migrate
RUN chmod +x /entrypoint.sh

CMD ["/entrypoint.sh"]