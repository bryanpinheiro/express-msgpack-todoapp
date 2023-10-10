import { Request, Response, NextFunction } from 'express';

function errorMiddleware(err: Error, req: Request, res: Response, next: NextFunction) {
  console.error('An error occurred:', err.stack);
  res.status(500).send('Something broke!');
}

export default errorMiddleware;
