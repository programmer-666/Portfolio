/*
import sqlite3 from "sqlite3";


const db = new sqlite3.Database("../src/soa_pf.db", (err) => {
    if (err) throw err;
});

db.run(`CREATE TABLE IF NOT EXISTS "blog"("id_blog" integer,"id_post" integer,"datetime_blog" datetime NOT NULL DEFAULT(datetime(CURRENT_TIMESTAMP,'localtime')),"tags_code" int DEFAULT'0',"share" BOOLEAN DEFAULT'0',PRIMARY KEY(id_blog),FOREIGN KEY(id_post)REFERENCES blog_Posts(id_post));`);
db.run(`CREATE TABLE IF NOT EXISTS blog_Posts(id_post INTEGER PRIMARY KEY AUTOINCREMENT,content_post TEXT,"title_post" VARCHAR);`);
db.run(`CREATE TABLE IF NOT EXISTS project_Posts(id_post INTEGER PRIMARY KEY AUTOINCREMENT,content_project TEXT,"title_project" VARCHAR);`);
db.run(`CREATE TABLE"projects"("id_project" integer,"id_post" integer,"datetime_post" datetime NOT NULL DEFAULT(datetime(CURRENT_TIMESTAMP,'localtime')),"share" BOOLEAN DEFAULT'0',PRIMARY KEY(id_project),FOREIGN KEY(id_post)REFERENCES project_Posts(id_post));`);
db.run(`CREATE TABLE IF NOT EXISTS "tags"("id_tag" integer NOT NULL DEFAULT NULL,"tag" varchar NOT NULL,"tag_value" int,PRIMARY KEY(id_tag));`);
// create database and tables

*/