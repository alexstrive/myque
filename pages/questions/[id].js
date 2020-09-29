import Head from 'next/head'
import { useSession } from 'next-auth/client'
import { connect } from '../../db'
import Question from '../../models/Question'

import { Container, Card, Col, Row, CardBody, CardHeader } from 'shards-react'
import QuestionAnswerForm from '../../components/QuestionAnswerForm'
import QuestionAnswer from '../../components/QuestionAnswer'

const doesBestAnswerExist = (question) =>
  question.answers.filter((answer) => answer.best).length > 0

const QuestionPage = ({ question }) => {
  const [session] = useSession()
  const canModify = session?.user?.name === question.author
  const canPromote = canModify && !doesBestAnswerExist(question)
  question.answers.sort((a, b) => b.best) // bubble best answer on the top

  return (
    <>
      <Head>
        <title>{question?.title}</title>
      </Head>
      <Container className="pt-4">
        <Row>
          <Col sm="12">
            <Card>
              <CardHeader>Вопрос от {question?.author}</CardHeader>
              <CardBody>
                <div>
                  <h3>{question?.title}</h3>
                  <p>{question?.description}</p>
                </div>
                <div>
                  <h5>Ответы</h5>
                  {question?.answers.map((answer) => (
                    <QuestionAnswer
                      {...answer}
                      canPromote={canPromote}
                      canModify={canModify}
                    />
                  ))}
                </div>
                <QuestionAnswerForm questionId={question._id} />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export async function getServerSideProps(context) {
  connect()
  const _id = context.params.id

  const question = await Question.findById(_id)
    .populate('answers', { question: 0, __v: 0 })
    .select({ _id: 0, __v: 0 })
    .lean()

  const questionSerialized = {
    ...question,
    _id,
    answers: question.answers.map((answer) => ({
      ...answer,
      _id: answer._id.toString(),
    })),
  }

  return {
    props: { question: questionSerialized },
  }
}

export default QuestionPage
