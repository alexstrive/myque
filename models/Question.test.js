import Question from './Question'

import connectToMockDB from '../connectToMockDB'

describe('models#Question', () => {
  let connection

  beforeAll(async () => {
    connection = await connectToMockDB()
  })

  it('creates a question', async () => {
    expect(await Question.countDocuments()).toEqual(0)

    await Question.create({
      author: 'some_mock_author',
      category: 'auto',
      description: 'One, two, three',
      title: 'Hello world',
    })

    expect(await Question.countDocuments()).toEqual(1)
  })

  it('creates multiple questions', async () => {
    expect(await Question.countDocuments()).toEqual(0)

    await Question.create({
      author: 'some_mock_author',
      category: 'auto',
      description: 'One, two, three',
      title: 'Hello world',
    })

    expect(await Question.countDocuments()).toEqual(1)

    await Question.create({
      author: 'another_author',
      category: 'development',
      description: 'Description about question',
      title: 'New technology has emerged',
    })

    expect(await Question.countDocuments()).toEqual(2)

    await Question.create({
      author: 'some_mock_author',
      category: 'development',
      description: 'Description about question',
      title: 'Okay, I was wrong',
    })

    expect(await Question.countDocuments()).toEqual(3)
  })

  it('fails to create question with invalid category', () => {
    expect(
      Question.create({
        author: 'me',
        category: 'cosmos',
        description: 'Description about question',
        title: 'My new question',
      })
    ).rejects.toThrow(/Question validation failed: category: `cosmos`/)
  })

  it('fails to create question without author', () => {
    expect(
      Question.create({
        category: 'development',
        description: 'Description about question',
        title: 'My new question',
      })
    ).rejects.toThrow(/Question validation failed: author:/)
  })

  it('fails to create question without category', () => {
    expect(
      Question.create({
        author: 'me',
        description: 'Description about question',
        title: 'My new question',
      })
    ).rejects.toThrow(/Question validation failed: category:/)
  })

  it('fails to create question without description', () => {
    expect(
      Question.create({
        author: 'me',
        category: 'auto',
        title: 'My new question',
      })
    ).rejects.toThrow(/Question validation failed: description:/)
  })

  it('fails to create question without title', () => {
    expect(
      Question.create({
        author: 'me',
        category: 'auto',
        description: 'about the question',
      })
    ).rejects.toThrow(/Question validation failed: title:/)
  })

  afterEach(async () => {
    await Question.deleteMany()
  })

  afterAll(async () => {
    await connection.close()
  })
})
