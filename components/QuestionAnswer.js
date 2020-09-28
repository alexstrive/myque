import { useRouter } from 'next/router'
import { Button, Badge } from 'shards-react'

const changeAnswerState = async (data) => {
  const result = await fetch('/api/answer', {
    method: 'PATCH',
    body: JSON.stringify(data),
  })

  const jsonResult = await result.json()

  return jsonResult
}

const Answer = ({ author, content, _id, best, canModify, canPromote }) => {
  const router = useRouter()
  const updateAnswer = () => {
    changeAnswerState({ answerId: _id }).then(() =>
      router.replace(router.asPath)
    )
  }

  return (
    <div className="mb-4 p-4 bg-light">
      <b>
        {author} {best && <Badge theme="warning">Лучший</Badge>}
        {canPromote && !best && (
          <Button size="sm" theme="light" outline onClick={updateAnswer}>
            Сделать лучшим ответом
          </Button>
        )}
        {canModify && best && (
          <Button size="sm" theme="light" outline onClick={updateAnswer}>
            Сделать обычным ответом
          </Button>
        )}
      </b>
      <p>{content}</p>
    </div>
  )
}

export default Answer
