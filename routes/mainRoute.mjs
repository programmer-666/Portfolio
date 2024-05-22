import express from "express";
import { getAllBlogPosts, getBlogPost, getAllTags } from "../src/db/blog.mjs";

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
  res.render("blog.ejs", { bPost: await getBlogPost(req.params.blogTitle) });
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
