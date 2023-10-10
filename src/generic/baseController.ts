import { Request, Response } from 'express';

abstract class BaseController<T> {
  protected dao: T;

  constructor(dao: T) {
    this.dao = dao;
  }

  abstract get(req: Request, res: Response): Promise<void>;

  abstract getById(req: Request, res: Response): Promise<void>;

  abstract create(req: Request, res: Response): Promise<void>;

  abstract update(req: Request, res: Response): Promise<void>;

  abstract delete(req: Request, res: Response): Promise<void>;
}

export default BaseController;
