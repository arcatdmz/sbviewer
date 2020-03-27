import { IBoxOptions } from "./box";
import { IAllOptions } from "./routes/all";

const opening = process.env.PAGE_OPENING
  || "[* Section to show]";
const endings = [
  "#diary",
  process.env.PAGE_ENDING || "[* Section to hide]"
];

const options: IBoxOptions & IAllOptions = process.env.PAGE_OPTIONS ? {
  // only show `2020-03-27`-like pages in /all
  filter: (pages) =>
    pages.filter((p) =>
      /^[0-9]{4}-[0-9]{1,2}-[0-9]{1,2}$/.test(p.title)),

  // hide irrelevant sections
  linesProcessor: (lines) => {
    const res = [lines[0]];
    let started = false;
    let finished = false;
    for (let i = 1; i < lines.length; i ++) {
      const line = lines[i];
      let active = false;
      if (line === opening) {
        started = true;
      } else if (started && !finished) {
        if (endings.includes(line)) {
          finished = true;
        } else {
          active = true;
        }
      }
      res.push(active ? line : `<!-- ${line} -->`);
    }
    return res;
  }
} : {};

export default options;
