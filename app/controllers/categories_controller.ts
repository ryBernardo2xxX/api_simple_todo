import type { HttpContext } from '@adonisjs/core/http'
import Category from '#models/category'
import { categoryValidator, updateCategoryValidator } from '#validators/category'

export default class CategoriesController {
  async index({ auth }: HttpContext) {
    const user = auth.getUserOrFail()
    const categories = await Category.query().where('userId', user.id)
    if (categories) {
      return []
    }
  }

  async store({ request, auth }: HttpContext) {
    const user = auth.getUserOrFail()
    const data = await request.validateUsing(categoryValidator)

    return await Category.create({ ...data, userId: user.id })
  }

  async show({ params, auth }: HttpContext) {
    const user = auth.getUserOrFail()

    return await Category.query()
      .where('categoryId', params.id)
      .where('userId', user.id)
      .firstOrFail()
  }

  async update({ params, request, auth }: HttpContext) {
    const user = auth.getUserOrFail()
    const data = await request.validateUsing(updateCategoryValidator)

    const category = await Category.query()
      .where('categoryId', params.id)
      .where('userId', user.id)
      .firstOrFail()

    category.merge(data)
    await category.save()

    return category
  }

  async destroy({ params, auth }: HttpContext) {
    const user = auth.getUserOrFail()

    const category = await Category.query()
      .where('categoryId', params.id)
      .where('userId', user.id)
      .firstOrFail()

    await category.delete()

    return { message: 'Category deleted', category }
  }
}
