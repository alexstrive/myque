import CustomUser from './CustomUser'

import connectToMockDB from '../connectToMockDB'

describe('models#CustomUser', () => {
  let connection

  beforeAll(async () => {
    connection = await connectToMockDB()
  })

  const mockUser = {
    username: 'some_user',
    password: 'secret_password',
    email: 'user@mail.com',
  }

  it('creates a user', async () => {
    await CustomUser.create(mockUser)

    expect(await CustomUser.countDocuments()).toEqual(1)
  })

  it('encrypts password automatically', async () => {
    const user = await CustomUser.create(mockUser)

    expect(user.password).not.toEqual(mockUser.password)
  })

  it('creates multiple users', async () => {
    const numberOfUsers = 5

    const userValues = []

    for (let i = 1; i < numberOfUsers + 1; i++) {
      userValues.push({
        username: `user${i}`,
        password: `pass${i}`,
        email: `user${i}@mail.ru`,
      })
    }

    await CustomUser.create(userValues)

    expect(await CustomUser.countDocuments()).toEqual(numberOfUsers)
  })

  it('fails to create user without username', async () => {
    expect(
      CustomUser.create({
        password: 'secret_password',
        email: 'username@mail.com',
      })
    ).rejects.toThrow(/CustomUser validation failed: username:/)
  })

  it('fails to create user without password', async () => {
    expect(
      CustomUser.create({
        username: 'user_without_password',
        email: 'username@mail.com',
      })
    ).rejects.toThrow(/CustomUser validation failed: password:/)
  })

  it('fails to create user without email', async () => {
    expect(
      CustomUser.create({
        username: 'user_without_email',
        password: '123123123',
      })
    ).rejects.toThrow(/CustomUser validation failed: email:/)
  })

  afterEach(async () => {
    await CustomUser.deleteMany()
  })

  afterAll(async () => {
    await connection.close()
  })
})
