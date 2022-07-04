import { resolver, Ctx } from "blitz"
import db, { Todo } from "db"

export default async function createTodo(input: Todo, ctx: Ctx) {
  ctx.session.$authorize("USER")
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const todo = await db.todo.create({
    data: { ...input, userId: ctx.session.userId, completed: false },
  })

  return todo
}
