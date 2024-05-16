import sqlite3 from "sqlite3";


const db = new sqlite3.Database("../../src/soa_pf.db", (err) => {
    if (err) throw err;
});
// Creating and connection database

db.run(`CREATE TABLE IF NOT EXISTS "blog"("id_blog" integer,"id_post" integer,"datetime_blog" datetime NOT NULL DEFAULT(datetime(CURRENT_TIMESTAMP,'localtime')),"tags_code" bigint DEFAULT'0',"share" BOOLEAN DEFAULT'0',PRIMARY KEY(id_blog),FOREIGN KEY(id_post)REFERENCES blog_Posts(id_post));`);
db.run(`CREATE TABLE IF NOT EXISTS blog_Posts(id_post INTEGER PRIMARY KEY AUTOINCREMENT,content_post TEXT,"title_post" VARCHAR);`);
db.run(`CREATE TABLE IF NOT EXISTS project_Posts(id_post INTEGER PRIMARY KEY AUTOINCREMENT,content_project TEXT,"title_project" VARCHAR);`);
db.run(`CREATE TABLE IF NOT EXISTS "projects"("id_project" integer,"id_post" integer,"datetime_post" datetime NOT NULL DEFAULT(datetime(CURRENT_TIMESTAMP,'localtime')),"tags_code" bigint DEFAULT'0',"share" BOOLEAN DEFAULT'0',PRIMARY KEY(id_project),FOREIGN KEY(id_post)REFERENCES project_Posts(id_post));`);
db.run(`CREATE TABLE IF NOT EXISTS "tags"("id_tag" integer NOT NULL DEFAULT NULL,"tag" varchar NOT NULL,"tag_value" bigint,PRIMARY KEY(id_tag));`);
// create tables

const tags = [
    { tag: "programlama", tag_value: null },
    { tag: "python", tag_value: null },
    { tag: "nodejs", tag_value: null },
    { tag: "javascript", tag_value: null },
    { tag: "express", tag_value: null },
    { tag: "yazılım", tag_value: null },
    { tag: "sistem", tag_value: null },
    { tag: "geliştirme", tag_value: null },
    { tag: "proje", tag_value: null },
    { tag: "web", tag_value: null },
    { tag: "c", tag_value: null },
    { tag: "c++", tag_value: null },
    { tag: "php", tag_value: null },
    { tag: "güvenlik", tag_value: null },
    { tag: "haber", tag_value: null },
    { tag: "teknoloji", tag_value: null },
    { tag: "sql", tag_value: null },
    { tag: "mysql", tag_value: null },
    { tag: "sqlite", tag_value: null },
    { tag: "sqlserver", tag_value: null }
];
let __COUNTER = 0;tags.map((element) => {element.tag_value = 2**__COUNTER;__COUNTER += 1;});
// default tags and tag values

const tags_insert_query = `INSERT OR IGNORE INTO tags (tag, tag_value) VALUES (?, ?)`;

tags.forEach((tag) => {
    db.run(tags_insert_query, [tag.tag, tag.tag_value], (err) => {
        if (err) throw err;
    });
});