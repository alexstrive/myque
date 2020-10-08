import { connect } from '../../db'
import CustomUser from '../../models/CustomUser'

connect()

const doesUserExist = async (username) => {
  return !!(await CustomUser.findOne({ username }))
}

export default async (req, res) => {
  if (req.method === 'POST') {
    const { username, password, email } = JSON.parse(req.body)

    if (await doesUserExist(username)) {
      res.json({
        success: false,
        message: 'Пользователь с таким именем уже существует',
      })
      return
    }

    const user = await CustomUser.create({ username, password, email })

    res.statusCode = 200
    res.json({ success: true })
    return
  }

  res.statusCode = 405
  res.end('Method Not Allowed')
}
