import sb2md from "sb2md";
import * as showdown from "showdown";

interface IPage {
  title: string;
  created: number;
  updated: number;
  lines: string[];
}

interface IPageOptions {
  linesProcessor?: (lines: string[]) => string[];
}

export class Page implements IPage {
  public title: string;
  public created: number;
  public updated: number;
  public lines: string[];

  constructor(params: IPage, private options?: IPageOptions) {
    this.title = params.title;
    this.created = params.created;
    this.updated = params.updated;
    this.lines = params.lines;
  }

  public path(): string {
    return `/${this.title}`;
  }

  public updatedAt(): Date {
    return new Date(this.updated * 1000);
  }

  public markdown(): string {
    let { lines } = this;
    if (this.options && this.options.linesProcessor) {
      lines = this.options.linesProcessor(lines);
    }
    return sb2md.convert([...lines].splice(1).join("\n"));
  }

  public html(): string {
    const converter = new showdown.Converter({
      simplifiedAutoLink: true,
    });
    return converter.makeHtml(this.markdown());
  }
}
export interface IPages {
  name: string;
  displayName: string;
  exported: number;
  pages: IPage[];
}
