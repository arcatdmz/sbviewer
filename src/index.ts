import "dotenv/config";
import express from "express";
import path from "path";
import { register } from "./routes";

const app = express();
const port = process.env.PORT || 8080;

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

register(app);

app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});
