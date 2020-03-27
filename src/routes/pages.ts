import { NextFunction, Request, Response, Router } from "express";
import { Box } from "../box";

export class Pages {
  public router: Router;
  constructor(private box: Box) {
    this.router = Router();
    this.initialize();
  }
  private initialize() {
    // XXX: sb2md appends links to `.md`...
    this.router.get(/^\/(.+).md$/, this.redirect.bind(this));
    this.router.get(/^\/(.+)$/, this.fetch.bind(this));
  }
  private fetch(req: Request, res: Response, next: NextFunction) {
    const { box } = this;
    const pageName: string = req.params[0];
    const page = box.getPage(pageName);
    if (!page) {
      res.status(404);
      res.setHeader("Content-Type", "text/plain; charset=UTF-8");
      res.send(`Page ${pageName} is not found`);
      return;
    }
    res.render("page", { box, page });
  }
  private redirect(req: Request, res: Response, next: NextFunction) {
    const pageName: string = req.params[0];
    res.redirect(`/pages/${pageName}`);
  }
}
