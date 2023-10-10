import { Request, Response } from 'express';
import { encode, decode } from '@msgpack/msgpack';

import TodoDAO from '../daos/todo.dao';
import BaseController from '../generic/baseController';
import errorHandler from '../utils/errorHandler';


class TodoController extends BaseController<TodoDAO> {

  constructor(todoDAO: TodoDAO) {
    super(todoDAO);
  }

  async get(req: Request, res: Response) {
    try {
      const todosData = await this.dao.findAll();

      if (todosData) {
        const todosMsgpack = encode(todosData);

        res.setHeader('Content-Type', 'application/octet-stream');
        res.send(Buffer.from(todosMsgpack));
      } else {
        errorHandler.sendInternalErrorResponse(res, null);
      }
    } catch (error) {
      errorHandler.sendInternalErrorResponse(res, error);
    }
  }

  async getById(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const todoData = await this.dao.findById(id);

      if (todoData) {
        const todoMsgpack = encode(todoData);

        res.setHeader('Content-Type', 'application/octet-stream');
        res.send(Buffer.from(todoMsgpack));
      } else {
        errorHandler.sendNotFoundResponse(res);
      }
    } catch (error) {
      errorHandler.sendInternalErrorResponse(res, error);
    }
  }

  async create(req: Request, res: Response) {
    const { title } = req.body;
    try {
      const newTodoData = await this.dao.create(title);

      if (newTodoData) {
        const newTodoMsgpack = encode(newTodoData);

        res.setHeader('Content-Type', 'application/octet-stream');
        res.send(Buffer.from(newTodoMsgpack));
      } else {
        errorHandler.sendInternalErrorResponse(res, null);
      }
    } catch (error) {
      errorHandler.sendInternalErrorResponse(res, error);
    }
  }

  async update(req: Request, res: Response) {
    const { id } = req.params;
    const { title, completed } = req.body;
    try {
      const updatedTodoData = await this.dao.update(id, title, completed);

      if (updatedTodoData) {
        const updatedTodoMsgpack = encode(updatedTodoData);

        res.setHeader('Content-Type', 'application/octet-stream');
        res.send(Buffer.from(updatedTodoMsgpack));
      } else {
        errorHandler.sendNotFoundResponse(res);
      }
    } catch (error) {
      errorHandler.sendInternalErrorResponse(res, error);
    }
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const deletedTodoData = await this.dao.delete(id);
      
      if (deletedTodoData) {
        const deletedTodoMsgpack = encode(deletedTodoData);

        res.setHeader('Content-Type', 'application/octet-stream');
        res.send(Buffer.from(deletedTodoMsgpack));
      } else {
        errorHandler.sendNotFoundResponse(res);
      }
    } catch (error) {
      errorHandler.sendInternalErrorResponse(res, error);
    }
  }
}

export default TodoController;
