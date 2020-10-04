import { useRouter } from 'next/router'
import { useForm, Controller } from 'react-hook-form'
import {
  FormInput,
  Form,
  Button,
  InputGroup,
  InputGroupAddon,
} from 'shards-react'

const QuestionTitleSearch = () => {
  const router = useRouter()
  const { handleSubmit, control } = useForm()

  const onSubmit = ({ title }) => {
    const query = {}

    if (title) {
      query.title = title
    }

    if (router.query.category) {
      query.category = router.query.category
    }

    router.push({
      pathname: router.pathname,
      query,
    })
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <InputGroup>
        <Controller
          as={FormInput}
          placeholder="Название интересующего вопроса"
          name="title"
          defaultValue={router.query?.title ?? ''}
          control={control}
        />
        <InputGroupAddon type="append">
          <Button theme="dark" type="submit">
            Найти
          </Button>
        </InputGroupAddon>
      </InputGroup>
    </Form>
  )
}

export default QuestionTitleSearch
