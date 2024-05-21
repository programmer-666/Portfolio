import sqlite3 from "sqlite3";
import { promisify } from "util";


const dbName = "./soa_pf.db";

const getAllBlogPosts = async () => {
    const db = new sqlite3.Database(dbName, sqlite3.OPEN_READONLY);

    const query = `SELECT blog.datetime_blog, blog.tags, blog.share,
    blog_Posts.title_post, blog_Posts.summary_post, blog_Posts.url_title_post 
    FROM blog 
    INNER JOIN blog_Posts ON blog.id_post = blog_Posts.id_post
    WHERE blog.share = '1';`;

    try {
        return await promisify(db.all).bind(db)(query);
    } catch (err) { 
        console.error(err); return null;
    } finally {
        db.close(err => {
            if (err) throw err;
        });
    }
};

const getBlogPost = async (titleURL) => {
    const db = new sqlite3.Database(dbName, sqlite3.OPEN_READONLY);

    const query = `SELECT blog.datetime_blog, blog.tags, blog.share,
    blog_Posts.title_post, blog_Posts.summary_post, blog_Posts.url_title_post 
    FROM blog 
    INNER JOIN blog_Posts ON blog.id_post = blog_Posts.id_post
    WHERE blog_Posts.url_title_post = ?;`;

    try {
        return await promisify(db.get).bind(db)(query, [titleURL]);
    } catch (err) {
        console.error(err);
        return null;
    }
    finally {
        db.close(err => {
            if (err) throw err;
        });
    }
};

const getAllTags = async () => {
    const db = new sqlite3.Database(dbName, sqlite3.OPEN_READONLY);

    const query = `SELECT tag FROM tags;`;

    try {
        return await promisify(db.all).bind(db)(query);
    } catch (err) {
        console.error(err);
        return null;
    } finally {
        db.close(err => {
            if (err) throw err;
        });
    }
};

export { getAllBlogPosts, getBlogPost, getAllTags};
