import { useQuery, gql } from '@apollo/client';
import { PRODUCTS_QUERY, PRODUCT_FRAGMENT, PRODUCT_QUERY } from './queries';
import { getFragmentData } from '../generated';

export function useProducts() {
  const { data, loading, error } = useQuery(PRODUCTS_QUERY, {
    fetchPolicy: 'network-only',
  });

  return { products: data?.products, loading, error: Boolean(error) };
}

export function useProduct(productId: string) {
  const { data, loading, error } = useQuery(PRODUCT_QUERY, {
    variables: { productId },
  });

  const productWithFragment = getFragmentData(PRODUCT_FRAGMENT, data.product);

  return { product: productWithFragment, loading, error };
}
