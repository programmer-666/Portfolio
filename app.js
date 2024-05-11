import express from "express";
import morgan from "morgan";

const app = express();
const mainRoute = express.Router();

app.use(express.static("public"));
app.use(morgan("combined"));
app.use("/", mainRoute);


mainRoute.get("/", (req, res) => {
    res.render("index.ejs");
});

mainRoute.get("/blog", (req, res) => {
    res.render("blogs.ejs");
});

mainRoute.get("/project-example", (req, res) => {
    res.render("project.ejs");
});

mainRoute.get("/cv", (req, res) => {
    res.render("cv.ejs");
});

mainRoute.get("/blog-example", (req, res) => {
    res.render("blog.ejs");
});

mainRoute.get("/projeler", (req, res) => {
    res.render("projects.ejs");
});


app.listen(process.env.PORT || 80);
