import express from "express";
import * as cheerio from "cheerio";
import { getAllBlogPosts, getAllTags, getBlogPost } from "../db/blog.mjs";
import { paginator } from "../utils/blog_page_functions.mjs";

const mainRouter = express.Router();
// root

mainRouter.get("/", (_, res) => {
    res.render("index.ejs");
});

mainRouter.get("/blog", async (_, res) => {
    const posts = await getAllBlogPosts();
    // console.log(paginator(posts));

    // need blog?page=1 ...

    res.render("blogs.ejs", {
        activePage: 1,
        pages: paginator(posts),
        allBlogPosts: await getAllBlogPosts(),
        allTags: await getAllTags(),
    });
});

mainRouter.get("/blog/:blogTitle", async (req, res, next) => {
    const post = await getBlogPost(req.params.blogTitle);
    const $ = cheerio.load(post.content_post);
    const headings = [];

    $("h1, h2, h3, h4, h5, h6").each((_, element) => {
        const tagName = $(element).prop("tagName").toLowerCase();
        const headingLevel = parseInt(tagName.replace("h", ""), 10);

        if (headingLevel >= 1 && headingLevel <= 6) {
            headings.push(`${"#".repeat(headingLevel)} ${$(element).text()}`);
        }
    });

    res.render("blog.ejs", {
        bPost: await getBlogPost(req.params.blogTitle),
        headings: headings,
    });
    next();
});

mainRouter.get("/project-example", (_, res) => {
    res.render("project.ejs");
});

mainRouter.get("/cv", (_, res) => {
    res.render("cv.ejs");
});

mainRouter.get("/projeler", (_, res) => {
    res.render("projects.ejs");
});

export { mainRouter };
