import { useRouter } from 'next/router'
import { useForm, Controller } from 'react-hook-form'

import { Form, FormGroup, FormTextarea, Button } from 'shards-react'

import ProtectedComponent from './ProtectedComponent'

const answerQuestion = async (data) => {
  return fetch('/api/answer', { method: 'POST', body: JSON.stringify(data) })
}

const QuestionAnswerForm = ({ questionId }) => {
  const router = useRouter()
  const { handleSubmit, control, reset } = useForm()
  const onSubmit = (data) => {
    answerQuestion({ ...data, question: questionId })
      .then(() => router.replace(router.asPath)) // reload page
      .then(reset())
  }

  return (
    <ProtectedComponent>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormGroup>
          <label htmlFor="#content">Ответ</label>
          <Controller
            as={FormTextarea}
            name="content"
            id="#content"
            rows="5"
            placeholder="Я знаю в чем проблема!"
            control={control}
            defaultValue=""
            rules={{ required: true }}
          />
        </FormGroup>

        <Button type="submit">Ответить</Button>
      </Form>
    </ProtectedComponent>
  )
}

export default QuestionAnswerForm
