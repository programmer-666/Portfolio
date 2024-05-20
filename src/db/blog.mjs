import sqlite3 from "sqlite3";
import { promisify } from "util";

const dbName = "./soa_pf.db";

const allPosts = async () => {
    const db = new sqlite3.Database(dbName, sqlite3.OPEN_READONLY);
    const getAllPosts = promisify(db.all).bind(db);

    const sql = `SELECT blog.datetime_blog, blog.tags, blog.share,
    blog_Posts.title_post, blog_Posts.summary_post 
    FROM blog 
    INNER JOIN blog_Posts ON blog.id_post = blog_Posts.id_post
    WHERE blog.share = '1';`;

    try {
        return await getAllPosts(sql);
    } catch (err) {
        console.error(err); return null;
    }
};

export { allPosts };
