import compression from "compression";
import express from "express";
import morgan from "morgan";
import path from "path";
import responseTime from "response-time";
import { mainRouter } from "./src/routes/mainRoute.mjs";

/*
import helmet from "helmet";
import session from "express-session";
*/

const app = express();

app.use(express.static(path.join(import.meta.dirname + "/public")));
// Serve static files from the "public" directory
/*
const session1 = session({
  secret: "s3cx",
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 60000 * 1, // 60s
    secure: false
  }
});
const session2 = session({
  secret: "s3cx2",
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 30000 * 1, // 30s
    secure: false
  }
});*/
// Session definitions

app.use(responseTime());
app.use(
    compression({
        level: 9,
        memLevel: 9,
    }),
);
// app.use(helmet());
app.use(morgan("combined"));
app.set("views", "./src/views");
app.set("view engine", "ejs");
app.use((err, __, res, _) => {
    console.error(err.stack);
    res.status(500).send("Error handled");
});
// Mids & Confs

//app.use("/projeler", session1);
//app.use("/blog", session2);
// Applying Sessions

app.use("/", mainRouter);
// Use the main router for all routes starting from "/"

app.listen(process.env.PORT || 80);
// Start the server
