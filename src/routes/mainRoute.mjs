import express from "express";
import sqlite3 from "sqlite3";
import { promisify } from "util";


export const mainRouter = express.Router();

mainRouter.get("/", (req, res) => {
    res.render("index.ejs");
});

mainRouter.get("/blog", async (req, res, next) => {
    // Open a read-only connection to the SQLite database
    const db = new sqlite3.Database("soa_pf.db", sqlite3.OPEN_READONLY, err => {
        if (err) return next(err);
    });

    // Promisify the db.all method for async/await usage
    const dbAll = promisify(db.all.bind(db));

    try {
        // Fetch all posts
        const rows = await dbAll(`
            SELECT blog.datetime_blog,blog.tags,blog.share,
            blog_Posts.title_post,blog_Posts.summary_post FROM blog 
            INNER JOIN blog_Posts ON blog.id_post=blog_Posts.id_post
            WHERE blog.share = '1';
        `);
        // tags will be add but not all tags, only writted posts tas...
        // Render the "blogs.ejs" template with the fetched tags
        res.render("blogs.ejs", { rows });
    } catch (err) {
        // Pass any errors to the error handling middleware
        next(err);
    } finally {
        // Ensure the database connection is closed
        db.close(err => { if (err) return next(err); });
    }
});

mainRouter.get("/blog/:blogTitle", (req, res, next) => {
    console.log(req.params.blogTitle);
    next();
    /*res.render("blog.ejs"); */
});

mainRouter.get("/project-example", (req, res) => {
    res.render("project.ejs");
});

mainRouter.get("/cv", (req, res) => {
    res.render("cv.ejs");
});

//mainRouter.get("/blog/blog-example", (req, res) => {
//    res.render("blog.ejs");
//});

mainRouter.get("/projeler", (req, res) => {
    res.render("projects.ejs");
});
