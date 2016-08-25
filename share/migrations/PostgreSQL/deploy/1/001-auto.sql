-- 
-- Created by SQL::Translator::Producer::PostgreSQL
-- Created on Thu Aug 25 14:25:05 2016
-- 
;
--
-- Table: item
--
CREATE TABLE "item" (
  "id" serial NOT NULL,
  "created" timestamp with time zone NOT NULL,
  "updated" timestamp with time zone,
  "title" character varying NOT NULL,
  PRIMARY KEY ("id")
);

;
