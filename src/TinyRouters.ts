import { Request, Response, Router, NextFunction } from 'express';
import { Document } from 'mongoose';
import { TinyControllers } from 'tiny-controllers';
import {
  ITinyControllers,
  TinyRoute,
  TinyRouteWithAuthen,
  TinyRoutersOptions,
  TinyRoutes
} from '../index';

class TinyRouters<T extends Document> {
  private _tinyController: ITinyControllers;
  private _apiName: string;
  private _baseUrl: string;
  private _router: Router;
  private _allRoutes: TinyRoutes = ['find', 'get', 'post', 'put', 'delete'];

  constructor(options: TinyRoutersOptions<T>) {
    this._tinyController = new TinyControllers<T>(options.model);
    this._router = options.router;
  }
  all(middlewares?) {
    this.find(middlewares);
    this.get(middlewares);
    this.post(middlewares);
    this.put(middlewares);
    this.delete(middlewares);
  }
  only(routes: TinyRoutes) {
    if (routes && Array.isArray(routes) && routes.length > 0) {
      routes.forEach(route => this.add(route));
    }
  }
  private find(middlewares?) {
    if (middlewares) {
      this._router.get(
        '/',
        middlewares,
        (req: Request, res: Response, next: NextFunction) =>
          this._tinyController.doFind(req, res, next)
      );
    } else {
      this._router.get('/', (req: Request, res: Response, next: NextFunction) =>
        this._tinyController.doFind(req, res, next)
      );
    }
  }
  private get(middlewares?) {
    if (middlewares) {
      this._router.get(
        '/:id',
        middlewares,
        (req: Request, res: Response, next: NextFunction) =>
          this._tinyController.doGet(req, res, next)
      );
    } else {
      this._router.get(
        '/:id',
        (req: Request, res: Response, next: NextFunction) =>
          this._tinyController.doGet(req, res, next)
      );
    }
  }
  private post(middlewares?) {
    if (middlewares) {
      this._router.post(
        '/',
        middlewares,
        (req: Request, res: Response, next: NextFunction) =>
          this._tinyController.doPost(req, res, next)
      );
    } else {
      this._router.post(
        '/',
        (req: Request, res: Response, next: NextFunction) =>
          this._tinyController.doPost(req, res, next)
      );
    }
  }
  private put(middlewares?) {
    if (middlewares) {
      this._router.put(
        '/:id',
        middlewares,
        (req: Request, res: Response, next: NextFunction) =>
          this._tinyController.doPut(req, res, next)
      );
    } else {
      this._router.put(
        '/:id',
        (req: Request, res: Response, next: NextFunction) =>
          this._tinyController.doPut(req, res, next)
      );
    }
  }
  private delete(middlewares?) {
    if (middlewares) {
      this._router.delete(
        '/:id',
        middlewares,
        (req: Request, res: Response, next: NextFunction) =>
          this._tinyController.doDelete(req, res, next)
      );
    } else {
      this._router.delete(
        '/:id',
        (req: Request, res: Response, next: NextFunction) =>
          this._tinyController.doDelete(req, res, next)
      );
    }
  }
  private add(route: TinyRoute | TinyRouteWithAuthen) {
    if (typeof route === 'string') {
      this[route]();
    } else {
      this[route.name](route.middlewares);
    }
  }
}

export { TinyRouters };
