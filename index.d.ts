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

declare type TinyRoutersOptions<DocType extends Document> = {
  model: Model<DocType>;
  router: Router;
};

declare type TinyRoutes = [TinyRoute | TinyRouteWithAuthen];

declare class TinyRouters<T, DocType extends Document> {
  private _tinyController;
  private _apiName;
  private _baseUrl;
  private _router;
  private _allRoutes;
  constructor(options: TinyRoutersOptions<DocType>);
  all(middlewares?: any): void;
  only(routes: TinyRoutes): void;
  private find(middlewares?);
  private get(middlewares?);
  private post(middlewares?);
  private put(middlewares?);
  private delete(middlewares?);
  private add(route);
}

export {
  ITinyControllers,
  TinyRoute,
  TinyRouteWithAuthen,
  TinyRoutersOptions,
  TinyRoutes,
  TinyRouters
};
