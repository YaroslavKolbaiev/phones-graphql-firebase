import { ApolloClient, InMemoryCache, gql } from '@apollo/client';
import { graphql } from '../generated';
import { GetProductsProps } from '../types/getProductsProps';

export const apolloClient = new ApolloClient({
  uri: 'http://localhost:9000/graphql',
  cache: new InMemoryCache(),
});

export const PRODUCT_FRAGMENT = graphql(`
  fragment productDetails on Product {
    age
    capacity
    discount
    id
    imageUrl
    createdAt
    model
    name
    price
    ram
    screen
    snippet
    type
    resolution
    processor
    camera
  }
`);

export const PRODUCTS_QUERY = graphql(`
  query Products($type: String, $limit: Int, $startAt: String, $sort: String) {
    products(type: $type, limit: $limit, startAt: $startAt, sort: $sort) {
      products {
        ...productDetails
      }
      totalAccessories
      totalPhones
      totalTablets
    }
  }
`);

export const PRODUCT_QUERY = graphql(`
  query Product($productId: ID!) {
    product(id: $productId) {
      ...productDetails
    }
  }
`);

export const FAVORITES_QUERY = graphql(`
  query Favorites($userId: ID!) {
    favorites(userId: $userId) {
      id
      product {
        ...productDetails
      }
      productId
      userId
    }
  }
`);

export const ADD_FAVORITE = graphql(`
  mutation AddFavorite($userId: String!, $productId: String!) {
    favorite: addFavorite(userId: $userId, productId: $productId) {
      id
      product {
        ...productDetails
      }
      productId
      userId
    }
  }
`);

export async function getProducts({
  type,
  limit,
  startAt,
  sort,
}: GetProductsProps) {
  try {
    const res = await apolloClient.query({
      query: PRODUCTS_QUERY,
      variables: { type, limit, startAt, sort },
      // fetchPolicy: 'network-only',
    });

    return { products: res.data.products };
  } catch (error) {
    return { error: error.message };
  }
}

export async function getProduct(productId: string) {
  try {
    const res = await apolloClient.query({
      query: PRODUCT_QUERY,
      variables: { productId },
    });

    return { product: res.data.product };
  } catch (error) {
    return { error: error.message };
  }
}

export async function getFavorites(userId: string) {
  try {
    const res = await apolloClient.query({
      query: FAVORITES_QUERY,
      variables: { userId },
    });

    return { favorites: res.data.favorites };
  } catch (error) {
    return { error: error.message };
  }
}

interface AddFavoriteProps {
  userId: string;
  productId: string;
}

export async function addFavorite(args: AddFavoriteProps) {
  try {
    const res = await apolloClient.mutate({
      mutation: ADD_FAVORITE,
      variables: args,
    });

    return res.data.favorite;
  } catch (error) {
    return { error: error.message };
  }
}
