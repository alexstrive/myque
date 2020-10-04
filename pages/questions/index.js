import { useRouter } from 'next/router'
import Head from 'next/head'
import { connect } from '../../db'
import escapeStringRegexp from 'escape-string-regexp'

import { Container, Card, CardBody, CardHeader } from 'shards-react'

import Question from '../../models/Question'

import Pagination from '../../components/Pagination'
import QuestionList from '../../components/QuestionList'
import QuestionTitleSearch from '../../components/QuestionTitleSearch'

const Questions = ({ questions, pages }) => {
  const router = useRouter()
  const targetCategory = router.query.category

  return (
    <>
      <Head>
        <title>Вопросы</title>
      </Head>
      <Container className="pt-4">
        <Card>
          <CardHeader>
            <QuestionTitleSearch />
          </CardHeader>
          <CardBody>
            <QuestionList items={questions} category={targetCategory} />
            <Pagination maxPages={pages} />
          </CardBody>
        </Card>
      </Container>
    </>
  )
}

export async function getServerSideProps(context) {
  connect()

  let questionFilter = {}

  if (context.query.category) {
    questionFilter.category = context.query.category
  }

  if (context.query.title) {
    questionFilter.title = new RegExp(
      escapeStringRegexp(context.query.title),
      'i'
    )
  }

  const pageNumber = context.query.p ?? 1
  const perPageItemsNumber = 10
  const skipItemsNumber = perPageItemsNumber * (pageNumber - 1)

  const totalQuestionNumber = await Question.countDocuments(questionFilter)
  const pages = Math.ceil(totalQuestionNumber / perPageItemsNumber)

  const questions = (
    await Question.find(questionFilter)
      .skip(skipItemsNumber)
      .limit(perPageItemsNumber)
      .sort('-_id')
      .select({ __v: 0, answers: 0 })
      .lean()
  ).map((question) => ({ ...question, _id: question._id.toString() }))

  return {
    props: {
      questions,
      pages,
    },
  }
}

export default Questions
