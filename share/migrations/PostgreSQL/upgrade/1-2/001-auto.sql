-- Convert schema '/Users/spot/dev/angular2-catalyst-starter/share/migrations/_source/deploy/1/001-auto.yml' to '/Users/spot/dev/angular2-catalyst-starter/share/migrations/_source/deploy/2/001-auto.yml':;

;
BEGIN;

;
CREATE TABLE "todo" (
  "id" serial NOT NULL,
  "created" timestamp with time zone NOT NULL,
  "updated" timestamp with time zone,
  "title" character varying NOT NULL,
  PRIMARY KEY ("id")
);

;
DROP TABLE item CASCADE;

;

COMMIT;

