import sqlite3 from "sqlite3";


const db = new sqlite3.Database("../../src/soa_pf.db", (err) => {
    if (err) throw err;
});
// Creating and connect database

db.run(`CREATE TABLE IF NOT EXISTS "blog"("id_blog" integer,"id_post" integer,"datetime_blog" datetime NOT NULL DEFAULT(datetime(CURRENT_TIMESTAMP,'localtime')),"tags" TEXT DEFAULT'0',"share" BOOLEAN DEFAULT'0',PRIMARY KEY(id_blog),FOREIGN KEY(id_post)REFERENCES blog_Posts(id_post));`);
db.run(`CREATE TABLE IF NOT EXISTS blog_Posts(id_post INTEGER PRIMARY KEY AUTOINCREMENT,content_post TEXT,"title_post" VARCHAR,"summary_post" TEXT, "url_title_post" VARCHAR);`);
db.run(`CREATE TABLE IF NOT EXISTS project_Posts(id_post INTEGER PRIMARY KEY AUTOINCREMENT,content_project TEXT,"title_project" VARCHAR);`);
db.run(`CREATE TABLE IF NOT EXISTS "projects"("id_project" integer,"id_post" integer,"datetime_post" datetime NOT NULL DEFAULT(datetime(CURRENT_TIMESTAMP,'localtime')),"tags" TEXT DEFAULT'0',"share" BOOLEAN DEFAULT'0',PRIMARY KEY(id_project),FOREIGN KEY(id_post)REFERENCES project_Posts(id_post));`);
db.run(`CREATE TABLE IF NOT EXISTS "tags"("id_tag" integer NOT NULL DEFAULT NULL,"tag" varchar NOT NULL UNIQUE,PRIMARY KEY(id_tag));`);
// create tables

const tags = [
    { tag: "programlama" },
    { tag: "python" },
    { tag: "nodejs" },
    { tag: "javascript" },
    { tag: "express" },
    { tag: "yazılım" },
    { tag: "sistem" },
    { tag: "geliştirme" },
    { tag: "proje" },
    { tag: "web" },
    { tag: "c" },
    { tag: "c++" },
    { tag: "php" },
    { tag: "güvenlik" },
    { tag: "haber" },
    { tag: "teknoloji" },
    { tag: "sql" },
    { tag: "mysql" },
    { tag: "sqlite" },
    { tag: "sqlserver" },
    { tag: "database" },
    { tag: "veritabanı" },
    { tag: "oyun" },
    { tag: "simülasyon" },
    { tag: "interface" },
    { tag: "software" },
    { tag: "hack" },
    { tag: "ctf" },
    { tag: "siber" },
    { tag: "code" },
    { tag: "linux" },
    { tag: "gnu" },
    { tag: "opensource" },
    { tag: "github" },
    { tag: "ai" },
    { tag: "ml" },
    { tag: "veri" },
    { tag: "derin öğrenme" }

];
//let __COUNTER = 0;tags.map((element) => {element.tag_value = 2**__COUNTER;__COUNTER += 1;});
// default tags and tag values

const tags_insert_query = `INSERT OR IGNORE INTO tags (tag) VALUES (?)`;

tags.forEach(tag => {
    db.run(tags_insert_query, [tag.tag, tag.tag_value], err => {
        if (err) throw err;
    });
});

db.close();
