import fs from "fs";
import { IPages, Page } from "./Page";

export interface IBoxOptions {
  linesProcessor?: (lines: string[]) => string[];
}

export class Box {
  public readonly filename: string;
  private readonly json: IPages;

  constructor(filename: string, private options?: IBoxOptions) {
    this.filename = filename;
    this.json = JSON.parse(
      fs.readFileSync(this.filename, "utf8")
    );
  }

  public name(): string {
    return this.json.name;
  }

  public exportedAt(): Date {
    return new Date(this.json.exported * 1000);
  }

  public pages(): Page[] {
    return this.json.pages
      .sort((a, b) => a.title.localeCompare(b.title))
      .map((p) => new Page(p, this.options));
  }

  public getPage(pageName: string): Page|undefined {
    const p = this.json.pages
      .find((page) => page.title === pageName);
    return p ? new Page(p, this.options) : undefined;
  }
}
