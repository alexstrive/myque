import {
  Container,
  Card,
  Col,
  Row,
  CardBody,
  CardHeader,
  Badge,
  Form,
  FormGroup,
  FormInput,
  Button,
} from 'shards-react'
import { useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { useRouter } from 'next/router'

const createUser = async (data) => {
  const result = await fetch('/api/signup', {
    method: 'POST',
    body: JSON.stringify(data),
  })

  const jsonResult = await result.json()

  if (!jsonResult.success) {
    throw jsonResult.message
  }
}

const SignUp = () => {
  const { control, handleSubmit } = useForm()
  const router = useRouter()

  const [error, setError] = useState()

  const onSubmit = (data) => {
    createUser(data)
      .then(() => router.replace('/'))
      .catch((message) => setError(message))
  }

  return (
    <Container className="pt-4">
      <Row>
        <Col md={{ size: 4, offset: 4 }}>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <h4>Регистрация</h4>

            {error && (
              <div className="p-3 mb-2 bg-danger text-white">{error}</div>
            )}

            <FormGroup>
              <label htmlFor="#username">Имя пользователя</label>
              <Controller
                as={FormInput}
                name="username"
                id="#username"
                placeholder=""
                defaultValue=""
                control={control}
                rules={{ required: true }}
              />
            </FormGroup>

            <FormGroup>
              <label htmlFor="#password">Пароль</label>
              <Controller
                as={FormInput}
                name="password"
                id="#password"
                placeholder=""
                defaultValue=""
                type="password"
                control={control}
                rules={{ required: true }}
              />
            </FormGroup>

            <Button type="submit" block>
              Зарегистрироваться
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  )
}

export default SignUp
