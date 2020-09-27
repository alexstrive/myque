import { getSession } from 'next-auth/client'

import { connect } from '../../db'
import Question from '../../models/Question'

connect()

export default async (req, res) => {
  const session = await getSession({ req })

  if (!session) {
    res.statusCode = 401
    res.end('Access Denied')
    return
  }

  if (req.method === 'POST') {
    const questionValues = JSON.parse(req.body)
    const question = await Question.create({
      ...questionValues,
      author: session?.user?.name,
    })

    res.statusCode = 200
    res.json({ success: true, _id: question._id.toString() })
    return
  }

  res.statusCode = 405
  res.end('Method Not Allowed')
}
