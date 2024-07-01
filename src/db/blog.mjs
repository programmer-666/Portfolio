import sqlite3 from "sqlite3";
import { promisify } from "util";

const dbName = "./src/soa_pf.db";

/**
 * This function works asynchronously.
 * It connects to the database and retrieves all blog posts that are shared.
 */
const getAllBlogPosts = async () => {
    // Open a connection to the SQLite database in read-only mode
    const db = new sqlite3.Database(dbName, sqlite3.OPEN_READONLY);

    // Define the SQL query to retrieve the blog posts
    const query = `SELECT blog.datetime_blog, blog.tags, blog.share,
    blog_Posts.title_post, blog_Posts.summary_post,
    blog_Posts.url_title_post
    FROM blog
    INNER JOIN blog_Posts ON blog.id_post = blog_Posts.id_post
    WHERE blog.share = '1' ORDER BY blog.datetime_blog DESC;`;

    try {
        // Execute the query and return the result as a promise
        return await promisify(db.all).bind(db)(query);
    } catch (err) {
        // Log any errors that occur during query execution
        console.error(err);
        return null;
    } finally {
        // Ensure the database connection is closed
        db.close((err) => {
            if (err) throw err;
        });
    }
};

/**
 * This function retrieves a specific blog post based on its URL title.
 * It connects to the SQLite database in read-only mode.
 */
const getBlogPost = async (titleURL) => {
    // Open a connection to the SQLite database in read-only mode
    const db = new sqlite3.Database(dbName, sqlite3.OPEN_READONLY);

    // Define the SQL query to retrieve the blog post with the specified URL title
    const query = `SELECT blog.tags,
    blog_Posts.title_post, blog_Posts.summary_post, blog_Posts.content_post,
    blog_Posts.url_title_post
    FROM blog
    INNER JOIN blog_Posts ON blog.id_post = blog_Posts.id_post
    WHERE blog_Posts.url_title_post = ?;`;

    try {
        // Execute the query with the specified titleURL and return the result as a promise
        return await promisify(db.get).bind(db)(query, [titleURL]);
    } catch (err) {
        // Log any errors that occur during query execution
        console.error(err);
        return null;
    } finally {
        // Ensure the database connection is closed
        db.close((err) => {
            if (err) throw err;
        });
    }
};

/**
 * This function retrieves all tags from the database.
 * It connects to the SQLite database in read-only mode.
 */
const getAllTags = async () => {
    // Open a connection to the SQLite database in read-only mode
    const db = new sqlite3.Database(dbName, sqlite3.OPEN_READONLY);

    // Define the SQL query to retrieve all tags
    const query = `SELECT tag FROM tags ORDER BY tag ASC;`;

    try {
        // Execute the query and return the result as a promise
        return await promisify(db.all).bind(db)(query);
    } catch (err) {
        // Log any errors that occur during query execution
        console.error(err);
        return null;
    } finally {
        // Ensure the database connection is closed
        db.close((err) => {
            if (err) throw err;
        });
    }
};

/**
 * This functions returns posts within the specified id range.
 */
const getPostsByIdRange = async (start, end) => {
    const db = new sqlite3.Database(dbName, sqlite3.OPEN_READONLY);

    const query = `SELECT blog.id_post,blog.datetime_blog,
    blog.tags,blog.share,blog_Posts.title_post,
    blog_Posts.summary_post,blog_Posts.url_title_post
    FROM blog INNER JOIN blog_Posts ON blog.id_post=blog_Posts.id_post
    WHERE blog.share='1' AND(blog.id_post BETWEEN 0 AND 3)ORDER BY blog.datetime_blog DESC;`;

    try {
        // Execute the query and return the result as a promise
        return await promisify(db.all).bind(db)(query);
    } catch (err) {
        // Log any errors that occur during query execution
        console.error(err);
        return null;
    } finally {
        // Ensure the database connection is closed
        db.close((err) => {
            if (err) throw err;
        });
    }
};

/**
 * This function returns all blog posts count.
 */
const getPostCount = async () => {
    const db = new sqlite3.Database(dbName, sqlite3.OPEN_READONLY);

    const query = `SELECT COUNT(id_post)as PostCount FROM blog_Posts;`;

    try {
        return await promisify(db.get).bind(db)(query);
    } catch (err) {
        // Log any errors that occur during query execution
        console.error(err);
        return null;
    } finally {
        // Ensure the database connection is closed
        db.close((err) => {
            if (err) throw err;
        });
    }
};

export {
    getAllBlogPosts,
    getAllTags,
    getBlogPost,
    getPostsByIdRange,
    getPostCount,
};
