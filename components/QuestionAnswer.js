import { useRouter } from 'next/router'
import { Button } from 'shards-react'

const makeAnswerBest = async (data) => {
  const result = await fetch('/api/answer', {
    method: 'PATCH',
    body: JSON.stringify(data),
  })

  const jsonResult = await result.json()

  return jsonResult
}

const Answer = ({ author, content, _id, best, canPromote }) => {
  const router = useRouter()
  const promoteAnswer = () => {
    makeAnswerBest({ answerId: _id }).then(() => router.replace(router.asPath))
  }

  return (
    <div className={`mb-4 p-4 ${best ? 'bg-warning' : ''}`}>
      <b>
        {author}{' '}
        {canPromote && !best && (
          <Button size="sm" theme="light" outline onClick={promoteAnswer}>
            Сделать лучшим
          </Button>
        )}
      </b>
      <p>{content}</p>
    </div>
  )
}

export default Answer
