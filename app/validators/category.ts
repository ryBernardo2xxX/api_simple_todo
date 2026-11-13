import vine from '@vinejs/vine'

export const categoryValidator = vine.create({
  title: vine.string(),
  color: vine.string().trim().minLength(7).maxLength(10),
})

export const updateCategoryValidator = vine.create(
  vine.object({
    title: vine.string().trim().minLength(7).maxLength(10).optional(),
    color: vine.string().trim().optional(),
  })
)
