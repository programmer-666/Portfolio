import express from "express";
import compression from "compression";
import morgan from "morgan";

const app = express();
const mainRouter = express.Router();

app.use(express.static("../public"));
app.use(compression());
app.use(morgan("combined"));

app.use("/", mainRouter);


mainRouter.get("/", (req, res) => {
    res.render("index.ejs");
});

mainRouter.get("/blog", (req, res) => {
    res.render("blogs.ejs");
});

mainRouter.get("/project-example", (req, res) => {
    res.render("project.ejs");
});

mainRouter.get("/cv", (req, res) => {
    res.render("cv.ejs");
});

mainRouter.get("/blog-example", (req, res) => {
    res.render("blog.ejs");
});

mainRouter.get("/projeler", (req, res) => {
    res.render("projects.ejs");
});


app.listen(process.env.PORT || 80);
