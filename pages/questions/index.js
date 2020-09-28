import { useMemo, useState } from 'react'
import { useRouter } from 'next/router'

import {
  Container,
  Card,
  Col,
  Row,
  CardBody,
  CardHeader,
  Badge,
  FormInput,
} from 'shards-react'
import Link from 'next/link'
import { connect } from '../../db'
import Question from '../../models/Question'

const Questions = ({ questions }) => {
  const router = useRouter()
  const targetCategory = router.query.category
  const passFilter = !targetCategory

  const [targetTitle, setTargetTitle] = useState('')

  const handleTargetTitleChange = (event) => {
    const value = event.target.value
    setTargetTitle(value.toLowerCase())
  }

  const filteredQuestions = useMemo(
    () =>
      questions
        .filter(
          (question) => question.category === targetCategory || passFilter
        )
        .filter((question) =>
          question.title.toLowerCase().includes(targetTitle)
        )
        .reverse(),
    [targetCategory, targetTitle]
  )

  return (
    <Container className="pt-4">
      <Card>
        <CardHeader>
          <FormInput
            placeholder="Название вопроса"
            onChange={handleTargetTitleChange}
          />
        </CardHeader>
        <CardBody>
          <table className="table table-hover" style={{ cursor: 'pointer' }}>
            <thead>
              <tr>
                <th scope="col">Вопрос</th>
                <th scope="col">Автор</th>
              </tr>
            </thead>
            <tbody>
              {filteredQuestions.map(({ title, _id, category, author }, i) => (
                <Link href={`/questions/${_id}`} key={_id}>
                  <tr>
                    <td>
                      {title} <Badge theme="dark">{category}</Badge>
                    </td>
                    <td>{author}</td>
                  </tr>
                </Link>
              ))}
            </tbody>
          </table>
        </CardBody>
      </Card>

      <Row></Row>
    </Container>
  )
}

export async function getServerSideProps() {
  connect()

  const questions = (
    await Question.find({}).select({ __v: 0, answers: 0 }).lean()
  ) // retrieve all values, except specified in `select`
    .map((question) => ({ ...question, _id: question._id.toString() })) // serialize `id` parameter

  return {
    props: { questions },
  }
}

export default Questions
