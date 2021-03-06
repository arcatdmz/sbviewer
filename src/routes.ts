import express = require("express");
import fs = require("fs");
import process from "process";

import { Box } from "./box";
import { All } from "./routes/all";
import { Pages } from "./routes/pages";

import options from "./options";

let jsonPath = process.env.PAGES_JSON;
const exists = fs.existsSync(jsonPath);
if (!jsonPath || !exists) {
  const paths = fs.readdirSync(".");
  jsonPath = paths.find(
    (p) =>
      /\.json$/.test(p) &&
      !/^ts.+\.json$/.test(p) &&
      !/^package(-lock)?\.json$/.test(p));
  if (!jsonPath) {
    throw new Error("PAGES_JSON is not set.");
  }
}

const box = new Box(jsonPath, options);

export const register = (app: express.Application) => {
  app.get("/", (req, res) => {
    res.render("index", { box });
  });
  app.use("/pages", new Pages(box).router);
  app.use("/all", new All(box, options).router);
};
