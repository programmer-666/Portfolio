import express from "express";

import { allPosts } from "../db/blog.mjs"

const mainRouter = express.Router();

mainRouter.get("/", (req, res) => {
    res.render("index.ejs");
});

mainRouter.get("/blog", async (req, res) => {
    res.render("blogs.ejs", { allPosts: await allPosts() });
});

mainRouter.get("/blog/:blogTitle", (req, res) => {
    console.log(req.params.blogTitle);
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

export { mainRouter };
