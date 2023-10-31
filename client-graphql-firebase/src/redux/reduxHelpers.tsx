import { useAppDispatch } from '../hooks/ReduxApp';
import { actions as productsByTypeActions } from './features/productsByType';
import { actions as endOfDataActions } from './features/endOfData';
import { Sort } from '../types/Sort';
import { ProductDetailsFragment } from '../generated/graphql';

export const useProductsByFilter = () => {
  const dispatch = useAppDispatch();
  const setProductsByFilter = (filter: string, sort: Sort) =>
    dispatch(
      productsByTypeActions.filter({
        filter,
        sort,
      })
    );
  return { setProductsByFilter };
};

export const useProductsByType = () => {
  const dispatch = useAppDispatch();
  const setProductsByType = (payload: ProductDetailsFragment[]) =>
    dispatch(productsByTypeActions.set(payload));

  return { setProductsByType };
};

export const useEndOfData = () => {
  const dispatch = useAppDispatch();
  const setEndOfData = (payload: boolean) =>
    dispatch(endOfDataActions.set(payload));

  return { setEndOfData };
};

export const useFilter = () => {
  const dispatch = useAppDispatch();
  const setFilterQuery = (payload: string) =>
    dispatch(productsByTypeActions.changeQuery(payload));

  return { setFilterQuery };
};
