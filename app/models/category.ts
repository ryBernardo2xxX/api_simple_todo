import { CategorySchema } from '#database/schema'
import { belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import User from './user.ts'

export default class Category extends CategorySchema {
  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>
}
