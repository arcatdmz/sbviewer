import { NextFunction, Request, Response, Router } from "express";
import { Box } from "../box";
import { Page } from "../Page";

export interface IAllOptions {
  filter?: (pages: Page[]) => Page[];
}

export class All {
  public router: Router;
  constructor(private box: Box, private options: IAllOptions) {
    this.router = Router();
    this.initialize();
  }
  private initialize() {
    this.router.get("/", this.fetchAll.bind(this));
  }
  private fetchAll(req: Request, res: Response, next: NextFunction) {
    const { box } = this;
    let pages = box.pages();
    if (this.options && this.options.filter) {
      pages = this.options.filter(pages);
    }
    res.render("pages", { box, pages });
  }
}
