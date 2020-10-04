import connectToMockDB from './connectToMockDB'

import { Question } from '../models'
describe('Question Model', () => {
  beforeAll(async () => {
    await connectToMockDB()
  })
  it('works', async () => {
    // await Question.create({ title: 'ABC def' })
    console.log(await Question.create({ title: 'asd' }))
    console.log(await Question.find())
  })
})
