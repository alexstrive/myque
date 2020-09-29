import Link from 'next/link'
import { Container, Card, CardBody, CardHeader, Row, Col } from 'shards-react'
import { Question } from '../models'
import { categoryTranslation } from '../constants'

const Categories = ({ categories }) => {
  return (
    <Container className="pt-4">
      <Row>
        {categories.map(({ key, title, count }) => (
          <Col sm="6" md="4" key={key} className="mb-4">
            <Link
              href={{
                pathname: '/questions',
                query: { category: key },
              }}
            >
              <Card style={{ cursor: 'pointer' }}>
                <CardHeader>{title}</CardHeader>
                <CardBody>Вопросов: {count}</CardBody>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </Container>
  )
}

export async function getServerSideProps() {
  const categories = (
    await Question.aggregate([
      { $group: { _id: '$category', count: { $sum: 1 } } },
    ]).sort('_id')
  ).map(({ _id, count }) => ({
    key: _id,
    title: categoryTranslation[_id],
    count,
  }))

  return {
    props: { categories },
  }
}

export default Categories
