import vine from '@vinejs/vine'

export const validateTask = vine.create({
  title: vine.string().minLength(1).maxLength(50),
  due_date: vine.date({
    formats: ['YYYY-MM-DD'],
  }),
  description: vine.string().trim().minLength(2).maxLength(100),
  category: vine.string(),
  is_done: vine.boolean().optional(),
})

export const validateUpdateTask = vine.create(
  vine.object({
    title: vine.string().trim().minLength(2).optional(),
    dueDate: vine
      .date({
        formats: ['YYYY-MM-DD'],
      })
      .optional(),
    description: vine.string().trim().minLength(2).maxLength(100).optional(),
    category: vine.string().trim().optional(),
    isDone: vine.boolean().optional(),
  })
)
