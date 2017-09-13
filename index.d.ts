import { Request, Response, NextFunction, Router } from 'express';
import { Document, Model } from 'mongoose';

declare interface ITinyControllers {
  doFind(req: Request, res: Response);
  doGet(req: Request, res: Response);
  doPost(req: Request, res: Response, next: NextFunction);
  doPut(req: Request, res: Response);
  doDelete(req: Request, res: Response);
}

declare type TinyRoute = 'find' | 'get' | 'post' | 'put' | 'delete';

declare type TinyRouteWithAuthen = {
  name: TinyRoute;
  middlewares?: Function | Function[];
};

declare type TinyRouterOptions<DocType extends Document> = {
  model: Model<DocType>;
  router: Router;
};

declare type TinyRoutes = [TinyRoute | TinyRouteWithAuthen];

export {
  ITinyControllers,
  TinyRoute,
  TinyRouteWithAuthen,
  TinyRouterOptions,
  TinyRoutes
};
