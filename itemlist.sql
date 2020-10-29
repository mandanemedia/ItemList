DROP TABLE IF EXISTS "public"."item";
CREATE TABLE "public"."item" (
  "listId" uuid NOT NULL,
  "itemId" uuid NOT NULL,
  "order" int4,
  "description" varchar(255) COLLATE "pg_catalog"."default"
)
;
ALTER TABLE "public"."item" OWNER TO "postgres";

BEGIN;
INSERT INTO "public"."item" VALUES ('1000ef5c-1657-46b2-bb36-c74080e00a11', '78decb78-35fa-4e15-b4ee-b6590e122cca', 7, 'Danial');
INSERT INTO "public"."item" VALUES ('1000ef5c-1657-46b2-bb36-c74080e00a11', '989683d2-594c-4776-a4ad-e5fd6b00c003', 6, 'Socks');
INSERT INTO "public"."item" VALUES ('1000ef5c-1657-46b2-bb36-c74080e00a11', 'acdc5775-a115-4d6e-9ba7-23c81aba2cd6', 5, 'Salmon');
INSERT INTO "public"."item" VALUES ('1000ef5c-1657-46b2-bb36-c74080e00a11', '989683d2-594c-4776-a4ad-e5fd6b00c001', 4, 'Apple');
INSERT INTO "public"."item" VALUES ('1000ef5c-1657-46b2-bb36-c74080e00a11', '989683d2-594c-4776-a4ad-e5fd6b00c004', 3, 'Cheese');
INSERT INTO "public"."item" VALUES ('1000ef5c-1657-46b2-bb36-c74080e00a11', '989683d2-594c-4776-a4ad-e5fd6b00c005', 2, 'Chicken');
INSERT INTO "public"."item" VALUES ('1000ef5c-1657-46b2-bb36-c74080e00a11', '989683d2-594c-4776-a4ad-e5fd6b00c002', 1, 'Beef BBQ');
COMMIT;

DROP TABLE IF EXISTS "public"."list";
CREATE TABLE "public"."list" (
  "listId" uuid NOT NULL
)
;
ALTER TABLE "public"."list" OWNER TO "postgres";

BEGIN;
INSERT INTO "public"."list" VALUES ('1000ef5c-1657-46b2-bb36-c74080e00a10');
INSERT INTO "public"."list" VALUES ('1000ef5c-1657-46b2-bb36-c74080e00a11');
COMMIT;

ALTER TABLE "public"."item" ADD CONSTRAINT "item_listId_order_key" UNIQUE ("listId", "order");
ALTER TABLE "public"."item" ADD CONSTRAINT "item_pkey" PRIMARY KEY ("itemId");
ALTER TABLE "public"."list" ADD CONSTRAINT "list_pkey" PRIMARY KEY ("listId");
ALTER TABLE "public"."item" ADD CONSTRAINT "item_listId_fkey" FOREIGN KEY ("listId") REFERENCES "public"."list" ("listId") ON DELETE RESTRICT ON UPDATE CASCADE;