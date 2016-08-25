-- 
-- Created by SQL::Translator::Producer::PostgreSQL
-- Created on Thu Aug 25 15:58:18 2016
-- 
;
--
-- Table: todo
--
CREATE TABLE "todo" (
  "id" serial NOT NULL,
  "created" timestamp with time zone NOT NULL,
  "updated" timestamp with time zone,
  "title" character varying NOT NULL,
  PRIMARY KEY ("id")
);

;
