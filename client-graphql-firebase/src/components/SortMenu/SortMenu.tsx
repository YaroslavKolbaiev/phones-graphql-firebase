import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/ReduxApp';
import { Sort } from '../../types/Sort';
import { actions as productsByTypeActions } from '../../redux/features/productsByType';
import { useProductsByFilter } from '../../redux/reduxHelpers';

export const SortMenu = () => {
  const { filterQuery, sort } = useAppSelector((state) => state.productsByType);

  const dispatch = useAppDispatch();
  const { setProductsByFilter } = useProductsByFilter();

  const setSort = (payload: Sort) =>
    dispatch(productsByTypeActions.changeSort(payload));

  useEffect(() => {
    setProductsByFilter(filterQuery, sort);
  }, [sort]);

  return (
    <div>
      <p
        className="
          has-text-grey-light
          is-size-7
          has-text-weight-bold
          mb-1
        "
      >
        Sort by
      </p>

      <select
        onChange={(e) => {
          setSort(e.currentTarget.value as Sort);
        }}
        role="menu"
        className="dropdown-item has-text-weight-semibold px-0 sortMenu"
      >
        {Object.values(Sort).map((sortType) => (
          <option
            className="dropdown-item has-text-weight-semibold"
            key={sortType}
            value={sortType}
          >
            {[sortType[0].toLocaleUpperCase(), ...sortType.split('').slice(1)]}
          </option>
        ))}
      </select>
    </div>
  );
};
