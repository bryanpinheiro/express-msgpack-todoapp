import { Router } from 'express';

export interface RouteMapping {
  method: 'get' | 'post' | 'put' | 'delete';
  path: '/' | '/:id';
}

const routes: Record<string, RouteMapping> = {
  get:     { method: 'get',     path: '/' },
  create:  { method: 'post',    path: '/' },
  getById: { method: 'get',     path: '/:id' },
  update:  { method: 'put',     path: '/:id' },
  delete:  { method: 'delete',  path: '/:id' }
}

class GenericRouter<T> {
  private router: Router;
  private controller: T;

  constructor(controller: T) {
    this.router = Router();
    this.controller = controller;
    this.setup(routes);
  }

  private setup(routes: Record<string, RouteMapping>) {
    for (const methodName in routes) {
      const route = routes[methodName];
      const handler = (this.controller as any)[methodName];
      this.router[route.method](route.path, handler.bind(this.controller));
    }
  }

  public getRouter(): Router {
    return this.router;
  }
}

export default GenericRouter;
