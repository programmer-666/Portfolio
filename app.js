import express from "express";
import morgan from "morgan";

const app = express();

app.use(express.static("public"));
app.use(morgan("dev"));

app.get("/", (req, res) => {
    res.render("index.ejs");
});

app.listen("80");
