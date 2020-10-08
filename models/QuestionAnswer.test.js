import QuestionAnswer from './QuestionAnswer'
import Question from './Question'

import connectToMockDB from '../connectToMockDB'

describe('models#QuestionAnswer', () => {
  let connection

  beforeAll(async () => {
    connection = await connectToMockDB()
  })

  const mockQuestion = {
    author: 'alex',
    category: 'business',
    description: 'about',
    title: 'My new question',
  }

  it('creates an answer', async () => {
    const question = await Question.create(mockQuestion)

    expect(await QuestionAnswer.countDocuments()).toEqual(0)

    await QuestionAnswer.create({
      question,
      content: 'new comment',
      author: 'bob',
    })

    expect(await QuestionAnswer.countDocuments()).toEqual(1)
  })

  it('links answer to question', async () => {
    let question = await Question.create(mockQuestion)

    const answer = await QuestionAnswer.create({
      question,
      content: 'new comment',
      author: 'bob',
    })

    question.answers.push(answer.id)
    await question.save()

    expect(question.answers.length).toEqual(1)

    question = await Question.findOne().populate('answers')

    expect(question.answers.length).toEqual(1)
  })

  it('fails to create an answer without question', async () => {
    expect(
      QuestionAnswer.create({
        content: 'new comment',
        author: 'bob',
      })
    ).rejects.toThrow(/QuestionAnswer validation failed: question:/)
  })

  it('fails to create an answer without content', async () => {
    const question = await Question.create(mockQuestion)

    expect(
      QuestionAnswer.create({
        question,
        author: 'bob',
      })
    ).rejects.toThrow(/QuestionAnswer validation failed: content:/)
  })

  it('fails to create an answer without author', async () => {
    const question = await Question.create(mockQuestion)

    expect(
      QuestionAnswer.create({
        question,
        content: 'my comment',
      })
    ).rejects.toThrow(/QuestionAnswer validation failed: author:/)
  })

  afterEach(async () => {
    await QuestionAnswer.deleteMany()
    await Question.deleteMany()
  })

  afterAll(async () => {
    await connection.close()
  })
})
