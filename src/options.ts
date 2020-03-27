import { IBoxOptions } from "./box";
import { IAllOptions } from "./routes/all";

const options: IBoxOptions & IAllOptions = {
  // only show `2020-03-27`-like pages in /all
  filter: (pages) =>
    pages.filter((p) =>
      /^[0-9]{4}-[0-9]{1,2}-[0-9]{1,2}$/.test(p.title)),

  // hide irrelevant sections?
  linesProcessor: (lines) => lines
};

export default options;
