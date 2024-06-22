import compression from "compression";
import express from "express";
import morgan from "morgan";
import path from "path";
import responseTime from "response-time";
import { mainRouter } from "./src/routes/mainRoute.mjs";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

/*
import helmet from "helmet";
import session from "express-session";
*/

const app = express();

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname + "/public")));
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
let logType = "combined";
if (process.env.NODE_ENV === "development") logType = "dev";

app.use(morgan(logType));
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

app.listen(process.env.PORT || 3000, () => {
    console.log(
        `[NODEINFO] PORT=${process.env.PORT} : ENV=${process.env.NODE_ENV} - Server Up`,
    );
});
// Start the server
