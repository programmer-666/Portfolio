import express from "express";
import * as cheerio from 'cheerio';
import { getAllBlogPosts, getAllTags, getBlogPost } from "../db/blog.mjs";

const mainRouter = express.Router();
// root router for website...

mainRouter.get("/", (req, res) => {
  res.render("index.ejs");
});

mainRouter.get("/blog", async (req, res) => {
  res.render("blogs.ejs", {
    allBlogPosts: await getAllBlogPosts(),
    allTags: await getAllTags(),
  });
});

mainRouter.get("/blog/:blogTitle", async (req, res, next) => {
  const post = await getBlogPost(req.params.blogTitle);
  const $ = cheerio.load(post.content_post);
  const headings = [];
  
  $("h1, h2, h3, h4").each((_, element) => {
    headings.push($(element).text());
  });

  res.render("blog.ejs", {
    bPost: await getBlogPost(req.params.blogTitle),
    headings: headings
  });
  next();
});

mainRouter.get("/project-example", (req, res) => {
  res.render("project.ejs");
});

mainRouter.get("/cv", (req, res) => {
  res.render("cv.ejs");
});

mainRouter.get("/projeler", (req, res) => {
  res.render("projects.ejs");
});

export { mainRouter };
