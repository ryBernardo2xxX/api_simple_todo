import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'tasks'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('task_id')

      table.string('title').notNullable()
      table.dateTime('due_date').notNullable()
      table.string('description', 100).nullable()
      table.boolean('is_done').defaultTo('false')

      table.integer('category_id').unsigned().references('category_id').inTable('categories')
      table.integer('user_id').unsigned().references('id').inTable('users')

      table.timestamps(true, true)
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
