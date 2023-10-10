import { PrismaClient, Todo } from '@prisma/client';
import errorHandler from '../utils/errorHandler';


// DAO handles database connection and CRUD operations
class TodoDAO {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async findAll(): Promise<Todo[] | undefined> {
    try {
      const todos = await this.prisma.todo.findMany();
      return todos;
    } catch (error) {
      errorHandler.handlePrismaError(error);
    }
  }

  async findById(id: string): Promise<Todo | null | undefined> {
    try {
      const todo = await this.prisma.todo.findUnique({ where: { id } });
      return todo;
    } catch (error) {
      errorHandler.handlePrismaError(error);
    }
  }

  async create(title: string): Promise<Todo | undefined> {
    try {
      const newTodo = await this.prisma.todo.create({
        data: { title, completed: false },
      });
      return newTodo;
    } catch (error) {
      errorHandler.handlePrismaError(error);
    }
  }

  async update(id: string, title: string, completed: boolean): Promise<Todo | null | undefined> {
    try {
      const updatedTodo = await this.prisma.todo.update({
        where: { id },
        data: { title, completed },
      });
      return updatedTodo;
    } catch (error) {
      errorHandler.handlePrismaError(error);
    }
  }

  async delete(id: string): Promise<Todo | null | undefined> {
    try {
      const deletedTodo = await this.prisma.todo.delete({
        where: { id },
      });
      return deletedTodo;
    } catch (error) {
      errorHandler.handlePrismaError(error);
    }
  }
}

export default TodoDAO;
