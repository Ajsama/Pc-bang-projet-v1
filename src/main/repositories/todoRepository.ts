import Todo from "src/shared/todo";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import { PrismaClient } from "./prisma/generated/client";

export class TodoRepository {
  private dbclient: PrismaClient;
  constructor() {
    let adapter = new PrismaMariaDb(process.env.DATABASE_URL);
    this.dbclient = new PrismaClient({ adapter });
  }

  async getTodos(): Promise<Todo[]> {
    let todos = await this.dbclient.todos.findMany({
      include: {
        todo_tags: {
          include: {
            tags: true,
          },
        }
      }
    });

    return todos.map((t) => {
      return {
        id: t.id,
        title: t.title,
        description: t.description,
        dateLimite: t.due_date,
        isFinished: t.is_finished,
        tags: t.todo_tags.map((tt) => tt.tags.name),
      } as Todo;
    });
  }

  async addTodo(todo: Todo): Promise<void> {
    await this.dbclient.todos.create({
      data: {
        id: 0,
        title: todo.title,
        description: todo.description,
        due_date: todo.dateLimite,
        is_finished: todo.isFinished,
      },
    });
  }

  async deleteTodo(id: number): Promise<void> {
    await this.dbclient.todos.delete({
      where: {
        id: id,
      },
    });
  }

  async toggleTodo(id: number): Promise<void> {
    let todo = await this.dbclient.todos.findUnique({
      where: {
        id: id,
      },
    });

    await this.dbclient.todos.update({
      where: {
        id: id,
      },
      data: {
        is_finished: {
          set: !todo.is_finished,
        },
      },
    });
  }
}
