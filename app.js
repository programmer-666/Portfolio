import express from "express";
import morgan from "morgan";

const app = express();

app.use(express.static("public"));
app.use(morgan("combined"));

app.get("/", (req, res) => {
    res.render("index.ejs");
});

app.get("/blog", (req, res) => {
    res.render("blogs.ejs");
});

app.get("/project-example", (req, res) => {
    res.render("project.ejs");
});

app.get("/cv", (req, res) => {
    res.render("cv.ejs");
});

app.get("/blog-example", (req, res) => {
    res.render("blog.ejs");
});

app.get("/projeler", (req, res) => {
    res.render("projects.ejs");
});

app.listen("80");
