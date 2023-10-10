import GenericRouter from '../generic/genericRouter';
import TodoController from '../controllers/todo.controller';

export class TodoRouter extends GenericRouter<TodoController> {
  constructor(controller: TodoController) {
    super(controller);
  }
}
