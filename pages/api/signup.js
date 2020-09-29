import { connect } from '../../db'
import CustomUser from '../../models/CustomUser'

const crypto = require('crypto')

connect()

const doesUserExist = async (username) => {
  return !!(await CustomUser.findOne({ username }))
}

export default async (req, res) => {
  if (req.method === 'POST') {
    const { username, password: plainPassword, email } = JSON.parse(req.body)

    if (await doesUserExist(username)) {
      res.json({
        success: false,
        message: 'Пользователь с таким именем уже существует',
      })
      return
    }

    const password = crypto
      .createHash('sha256')
      .update(plainPassword)
      .digest('base64')

    const user = await CustomUser.create({ username, password, email })

    res.statusCode = 200
    res.json({ success: true })
    return
  }

  res.statusCode = 405
  res.end('Method Not Allowed')
}
