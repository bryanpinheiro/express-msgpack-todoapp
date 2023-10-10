import express, { Express } from 'express';
import { PrismaClient } from '@prisma/client';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import errorMiddleware from './middlewares/error.middleware';

import TodoDAO from './daos/todo.dao';
import TodoController from './controllers/todo.controller';
import { TodoRouter } from './routers/todo.router';
import { setupSwagger } from './swagger/setupSwagger';

dotenv.config();

const PORT = 3000;

class ExpressAppServer {
  private app: Express;
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
    this.app = express();
    
    this.configure();

    setupSwagger(this.app);
  }

  private configure(): void {
    const todoDAO = new TodoDAO(this.prisma);
    const todoMobileController = new TodoController(todoDAO);
    const todoMobileRouter = new TodoRouter(todoMobileController);

    this.app.use(bodyParser.json()); // testing with swagger ui
    this.app.use('/api/todo', todoMobileRouter.getRouter());
  }

  public start(port: number): void {
    this.app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  }
}

const prisma = new PrismaClient();

const server = new ExpressAppServer(prisma);
server.start(PORT);
