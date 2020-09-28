import { getSession } from 'next-auth/client'

import { connect } from '../../db'
import Question from '../../models/Question'
import QuestionAnswer from '../../models/QuestionAnswer'

connect()

export default async (req, res) => {
  const session = await getSession({ req })

  if (!session) {
    res.statusCode = 401
    res.end('Access Denied')
    return
  }

  if (req.method === 'POST') {
    const answerValues = JSON.parse(req.body)
    const answer = await QuestionAnswer.create({
      ...answerValues,
      author: session?.user?.name,
      best: false,
    })

    const question = await Question.findById(answerValues.question)
    question.answers.push(answer._id)
    await question.save()

    res.statusCode = 200
    res.json({ success: true })
    return
  }

  if (req.method === 'PATCH') {
    const { answerId } = JSON.parse(req.body)

    const answer = await QuestionAnswer.findById(answerId)
    answer.best = !answer.best
    answer.save()

    res.json({ success: true })
    return
  }

  res.statusCode = 405
  res.end('Method Not Allowed')
}
