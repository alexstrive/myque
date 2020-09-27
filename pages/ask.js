import { useSession } from 'next-auth/client'
import { useRouter } from 'next/router'
import { useForm, Controller } from 'react-hook-form'

import {
  Container,
  Form,
  FormGroup,
  FormInput,
  FormTextarea,
  FormSelect,
  Button,
} from 'shards-react'

import { categories } from '../constants'
import ProtectedComponent from '../components/ProtectedComponent'

const createNewQuestion = async (data) => {
  return fetch('/api/ask', { method: 'POST', body: JSON.stringify(data) })
}

const Ask = () => {
  const router = useRouter()
  const [session] = useSession()
  const { handleSubmit, control } = useForm()

  const onSubmit = (data) => {
    createNewQuestion({ ...data, author: session?.user?.name })
      .then((response) => response.json())
      .then((jsonResponse) => {
        router.replace(`/questions/${jsonResponse._id}`)
      })
  }

  return (
    <ProtectedComponent redirect>
      <Container className="pt-4">
        <h1>Задайте свой вопрос</h1>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <FormGroup>
            <label htmlFor="#title">Заголовок</label>
            <Controller
              as={FormInput}
              name="title"
              id="#title"
              placeholder="Как создать машину времени?"
              control={control}
              rules={{ required: true }}
            />
          </FormGroup>

          <FormGroup>
            <label htmlFor="#category">Категория</label>
            <Controller
              as={FormSelect}
              name="category"
              id="#category"
              placeholder="Как создать машину времени?"
              control={control}
              rules={{ required: true }}
            >
              {categories.map(({ key, title }) => (
                <option value={key} key={key}>
                  {title}
                </option>
              ))}
            </Controller>
          </FormGroup>

          <FormGroup>
            <label htmlFor="#description">Описание</label>
            <Controller
              as={FormTextarea}
              name="description"
              id="#description"
              rows="5"
              placeholder="Однажды я посмотрел фильм и задался вопросом"
              control={control}
              rules={{ required: true }}
            />
          </FormGroup>

          <Button type="submit">Задать вопрос</Button>
        </Form>
      </Container>
    </ProtectedComponent>
  )
}

export default Ask
