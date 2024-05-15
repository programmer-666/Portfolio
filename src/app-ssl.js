import compression from "compression";
import express from "express";
import morgan from "morgan";
import https from "https";

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

const httpsServer = https.createServer(
  {
    key: "privatekeyPathEnv",
    cert: "certkeyPathEnv",
  },
  app,
);

app.listen(process.env.PORT || 80);
httpsServer.listen(process.env.PORT || 443);
