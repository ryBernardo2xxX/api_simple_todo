import type { HttpContext } from '@adonisjs/core/http'
import Task from '#models/task'
import Category from '#models/category'
import { validateTask, validateUpdateTask } from '#validators/task'

export default class TasksController {
  async index({ auth }: HttpContext) {
    // Show Tasks
    const user = auth.getUserOrFail()
    const task = await Task.query().where('userId', user.id).firstOrFail()
    return task
  }

  async store({ request, auth, response }: HttpContext) {
    // create a new Task
    const user = auth.getUserOrFail()
    const { category: categoryTitle, ...data } = await request.validateUsing(validateTask)

    let category = await Category.query()
      .where('title', categoryTitle)
      .where('userId', user.id)
      .first()

    if (!category) {
      return response.badRequest({ message: 'Category not found' })
    }

    return await Task.create({
      ...data,
      categoryId: category.categoryId,
      userId: user.id,
    })
  }

  async show({ params, auth }: HttpContext) {
    // Show an Task
    const user = auth.getUserOrFail()
    const task = await Task.query()
      .where('taskId', params.id)
      .where('userId', user.id)
      .firstOrFail()
    return task
  }

  async update({ params, auth, request, response }: HttpContext) {
    // Edit Task
    const user = auth.getUserOrFail()

    const { category: categoryTitle, ...data } = await request.validateUsing(validateUpdateTask)

    const task = await Task.query()
      .where('taskId', params.id)
      .where('userId', user.id)
      .firstOrFail()

    if (categoryTitle !== undefined) {
      const category = await Category.query()
        .where('title', categoryTitle)
        .where('userId', user.id)
        .first()
      if (!category) {
        return response.badRequest({ message: 'Category not found' })
      }
      task.categoryId = category.categoryId
    }
    task.merge(data)
    await task.save()

    return task
  }

  async destroy({ params, auth }: HttpContext) {
    // Delete Task
    const user = auth.getUserOrFail()

    const task = await Task.query()
      .where('taskId', params.id)
      .where('userId', user.id)
      .firstOrFail()

    await task.delete()

    return { message: 'Task deleted', task }
  }
}
