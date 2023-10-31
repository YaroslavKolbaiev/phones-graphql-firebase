import classNames from 'classnames';
import { useSearchParams } from 'react-router-dom';
import { SearchLink } from '../SearchLink';

type Props = {
  totalItems: number;
  itemsPerPage: number;
};

export const Pagination: React.FC<Props> = ({ totalItems, itemsPerPage }) => {
  // const pageNumbers = [];

  // for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i += 1) {
  //   pageNumbers.push(i);
  // }
  const [searchParams] = useSearchParams();

  const page = searchParams.get('page') || '1';

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const pageNumbers = getVisiblePages(+page, totalPages);

  const prevPage = (+page - (+page > 1 ? 1 : 0)).toString();
  const nextPage = (+page + (+page < pageNumbers.length ? 1 : 0)).toString();

  const prevDisabled = +page === 1;
  const nextDisabled = +page === pageNumbers.length;

  return (
    <>
      <nav className="pagination is-centered" role="navigation">
        <ul className="pagination-list">
          <li>
            <SearchLink
              className={classNames('pagination-previous', {
                'is-disabled': prevDisabled,
              })}
              params={{ page: prevPage }}
            >
              «
            </SearchLink>
          </li>
          {pageNumbers.map((pageNumber) => (
            <li key={pageNumber}>
              <SearchLink
                className={classNames('pagination-link', {
                  'has-background-dark has-text-white': pageNumber === +page,
                })}
                params={{ page: pageNumber.toString() }}
              >
                {pageNumber}
              </SearchLink>
            </li>
          ))}
          <li>
            <SearchLink
              className={classNames('pagination-next', {
                'is-disabled': nextDisabled,
              })}
              params={{ page: nextPage }}
            >
              »
            </SearchLink>
          </li>
        </ul>
      </nav>
    </>
  );
};

function getVisiblePages(current: number, total: number) {
  if (total <= 7) {
    return range(total);
  }
  if (current < 5) {
    return [...range(5), '...', total];
  }
  if (current > total - 4) {
    return [1, '...', ...range(5, total - 4)];
  }
  return [1, '...', current - 1, current, current + 1, '...', total];
}

function range(count: number, start = 1) {
  return Array.from(new Array(count), (x, i) => i + start);
}

export default Pagination;
