#!/bin/bash
sleep 5
dsn=${POSTGRES_DSN?POSTGRES_DSN environment variable must be set}

echo "Danial $dsn \n"

/migrate create -ext sql -dir db/migration -seq init_schema

/migrate -verbose \
  -database "$dsn" \
  -path /db/migrations \
  up