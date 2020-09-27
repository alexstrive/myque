import { connect } from '../../db'
import Question from '../../models/Question'

import { Container, Card, Col, Row, CardBody, CardHeader } from 'shards-react'
import QuestionAnswerForm from '../../components/QuestionAnswerForm'
import QuestionAnswer from '../../components/QuestionAnswer'

const QuestionPage = ({ question }) => {
  return (
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
                  <QuestionAnswer {...answer} />
                ))}
              </div>
              <QuestionAnswerForm questionId={question._id} />
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export async function getServerSideProps(context) {
  connect()

  const _id = context.params.id

  const question = await Question.findById(_id)
    .populate('answers', { _id: 0, question: 0, __v: 0 })
    .select({ _id: 0, __v: 0 })
    .lean()

  return {
    props: { question: { ...question, _id } },
  }
}

export default QuestionPage
