CREATE TABLE "public"."list"
(
    "listId" uuid NOT NULL
);
ALTER TABLE "public"."list" OWNER TO "postgres";

BEGIN;
INSERT INTO "public"."list"
VALUES ('1000ef5c-1657-46b2-bb36-c74080e00a10');
INSERT INTO "public"."list"
VALUES ('1000ef5c-1657-46b2-bb36-c74080e00a11');
COMMIT;

ALTER TABLE "public"."list" ADD CONSTRAINT "list_pkey" PRIMARY KEY ("listId");
