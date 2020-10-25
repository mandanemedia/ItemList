DROP TABLE IF EXISTS "public"."list";
CREATE TABLE "public"."list" (
  "listId" uuid NOT NULL
)
;
ALTER TABLE "public"."list" OWNER TO "postgres";
ALTER TABLE "public"."list" ADD CONSTRAINT "list_pkey" PRIMARY KEY ("listId");

DROP TABLE IF EXISTS "public"."item";
CREATE TABLE "public"."item" (
  "listId" uuid NOT NULL,
  "itemId" uuid NOT NULL,
  "order" int4,
  "description" varchar(255) COLLATE "pg_catalog"."default"
)
;
ALTER TABLE "public"."item" OWNER TO "postgres";
ALTER TABLE "public"."item" ADD CONSTRAINT "item_pkey" PRIMARY KEY ("itemId");
ALTER TABLE "public"."item" ADD CONSTRAINT "item_listId_fkey" FOREIGN KEY ("listId") REFERENCES "public"."list" ("listId") ON DELETE RESTRICT ON UPDATE CASCADE;

BEGIN;
INSERT INTO "public"."list"("listId") VALUES ('1000ef5c-1657-46b2-bb36-c74080e00a10');
INSERT INTO "public"."list"("listId") VALUES ('1000ef5c-1657-46b2-bb36-c74080e00a11');
COMMIT;

BEGIN;
INSERT INTO "public"."item" VALUES ('1000ef5c-1657-46b2-bb36-c74080e00a11', '989683d2-594c-4776-a4ad-e5fd6b00c001', 1, 'Apple');
INSERT INTO "public"."item" VALUES ('1000ef5c-1657-46b2-bb36-c74080e00a11', '989683d2-594c-4776-a4ad-e5fd6b00c002', 2, 'Tuna');
INSERT INTO "public"."item" VALUES ('1000ef5c-1657-46b2-bb36-c74080e00a11', '989683d2-594c-4776-a4ad-e5fd6b00c003', 3, 'Socks');
INSERT INTO "public"."item" VALUES ('1000ef5c-1657-46b2-bb36-c74080e00a11', '989683d2-594c-4776-a4ad-e5fd6b00c004', 4, 'Cheese');
INSERT INTO "public"."item" VALUES ('1000ef5c-1657-46b2-bb36-c74080e00a11', '989683d2-594c-4776-a4ad-e5fd6b00c005', 5, 'Chicken');
INSERT INTO "public"."item" VALUES ('1000ef5c-1657-46b2-bb36-c74080e00a11', '989683d2-594c-4776-a4ad-e5fd6b00c006', 6, 'Milk');
COMMIT;
