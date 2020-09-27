import Link from 'next/link'
import { Container } from 'shards-react'
import { categories } from '../constants'

const Categories = () => {
  return (
    <Container className="pt-4">
      {categories.map(({ key, title }) => (
        <div key={key}>
          <Link
            href={{
              pathname: '/questions',
              query: { category: key },
            }}
          >
            {title}
          </Link>
        </div>
      ))}
    </Container>
  )
}

export default Categories
