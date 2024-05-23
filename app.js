import compression from "compression";
import express from "express";
import morgan from "morgan";
import path from "path";
import { mainRouter } from "./routes/mainRoute.mjs";

const app = express();

// Serve static files from the "public" directory
app.use(express.static(path.join(import.meta.dirname + "/public")));

app.use(
  compression({
    level: 9,
    memLevel: 9,
  }),
);
app.use(morgan("dev"));
app.set("view engine", "ejs");
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Error handled");
});

// Use the main router for all routes starting from "/"
app.use("/", mainRouter);

// Start the server
app.listen(process.env.PORT || 80);
