import { range } from 'rambda'
import classNames from 'classnames'
import { useRouter } from 'next/router'
import Link from 'next/link'

const Pagination = ({ maxPages = 1 }) => {
  const router = useRouter()
  const visitedPageNumber = Number.parseInt(router.query?.p ?? 1)

  return (
    <div>
      <ul className="pagination">
        {range(1, maxPages + 1).map((pageNumber) => (
          <li
            className={classNames('page-item', {
              active: visitedPageNumber === pageNumber,
            })}
            key={pageNumber}
          >
            <Link
              href={{ query: { p: pageNumber }, href: router.asPath }}
              passHref
            >
              <a className="page-link">{pageNumber}</a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Pagination
