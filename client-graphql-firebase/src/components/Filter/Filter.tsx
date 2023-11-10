import { useLocation } from 'react-router-dom';
import { BiSearchAlt } from 'react-icons/bi';
import { useAppSelector } from '../../hooks/ReduxApp';
import { useEffect } from 'react';
import { useFilter, useProductsByFilter } from '../../redux/reduxHelpers';

export const Filter: React.FC = () => {
  const location = useLocation()
    .pathname.split('/')
    .filter((x) => x)
    .join('');

  const { filterQuery, sort } = useAppSelector((state) => state.productsByType);

  const { setProductsByFilter } = useProductsByFilter();
  const { setFilterQuery } = useFilter();

  useEffect(() => {
    setProductsByFilter(filterQuery, sort);
  }, [filterQuery]);

  return (
    <div className="box is-flex is-align-items-center">
      <input
        className="input is-small filter"
        type="search"
        value={filterQuery}
        placeholder={`search in ${location}`}
        onChange={(e) => setFilterQuery(e.target.value)}
      />
      <BiSearchAlt size="24px" />
    </div>
  );
};
