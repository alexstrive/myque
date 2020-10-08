import { generateCategoryKeys, generateCategoryTranslations } from '../utils/'

describe('utils#categories', () => {
  const mockCategories = [
    { key: 'cat1', title: 'Cat 1' },
    { key: 'cat2', title: 'Cat 2' },
    { key: 'cat3', title: 'Cat 3' },
    { key: 'cat4', title: 'Cat 4' },
  ]

  it('generates category keys', () => {
    const keys = generateCategoryKeys(mockCategories)

    expect(keys).toEqual(['cat1', 'cat2', 'cat3', 'cat4'])
  })

  it('generates category translation', () => {
    const translations = generateCategoryTranslations(mockCategories)

    for (const category of mockCategories) {
      expect(translations[category.key]).toEqual(category.title)
    }
  })
})
