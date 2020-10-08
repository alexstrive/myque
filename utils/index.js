export const generateCategoryKeys = (categories) =>
  categories.map((category) => category.key)

export const generateCategoryTranslations = (categories) =>
  Object.values(categories).reduce(
    (acc, category) => ({
      ...acc,
      [category.key]: category.title,
    }),
    {}
  )
