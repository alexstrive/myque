import Link from 'next/link'
import { Badge } from 'shards-react'
import { categoryTranslation } from '../constants'

const QuestionList = ({ items = [], category = '' }) => {
  const showCategoryBadge = !category

  return (
    <>
      {category && <h3>{categoryTranslation[category]}</h3>}
      <table className="table table-hover" style={{ cursor: 'pointer' }}>
        <thead>
          <tr>
            <th scope="col">Вопрос</th>
            <th scope="col">Автор</th>
          </tr>
        </thead>
        <tbody>
          {items.map(({ title, _id, category, author }) => (
            <Link href={`/questions/${_id}`} key={_id}>
              <tr>
                <td>
                  {title}{' '}
                  {showCategoryBadge && (
                    <Badge theme="dark">{categoryTranslation[category]}</Badge>
                  )}
                </td>
                <td>{author}</td>
              </tr>
            </Link>
          ))}
        </tbody>
      </table>
    </>
  )
}

export default QuestionList
