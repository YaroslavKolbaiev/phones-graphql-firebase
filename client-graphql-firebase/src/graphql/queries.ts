import { ApolloClient, InMemoryCache, gql } from '@apollo/client';
import { getFragmentData, graphql } from '../generated';
import { GetProductsProps } from '../types/getProductsProps';
import { Favorites } from '../generated/graphql';

export const apolloClient = new ApolloClient({
  uri: 'https://phones-graphql-firebase.onrender.com/graphql',
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
  query Favorites($userId: ID!, $collection: String!) {
    favorites(userId: $userId, collection: $collection) {
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
  mutation AddFavorite(
    $userId: String!
    $productId: String!
    $collection: String!
  ) {
    favorite: addFavorite(
      userId: $userId
      productId: $productId
      collection: $collection
    ) {
      id
      product {
        ...productDetails
      }
      productId
      userId
    }
  }
`);

export const DELETE_FAVORITE = graphql(`
  mutation DeleteFavorite($favoritId: String!, $collection: String!) {
    favoriteData: deleteFavorite(
      favoritId: $favoritId
      collection: $collection
    ) {
      id
      productId
      userId
    }
  }
`);

export const DELETE_CART = graphql(`
  mutation Mutation($userId: String!) {
    deleteCart(userId: $userId)
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

export async function getFavOrCart(userId: string, collection: string) {
  try {
    const res = await apolloClient.query({
      query: FAVORITES_QUERY,
      variables: { userId, collection },
    });

    const favoritesWithFragment: Favorites[] = [];

    res.data.favorites.forEach((fav) => {
      const { id, productId, userId, product } = fav;

      const productFragmentData = getFragmentData(PRODUCT_FRAGMENT, product);

      favoritesWithFragment.push({
        id,
        productId,
        userId,
        product: productFragmentData,
      });
    });

    return { favorites: favoritesWithFragment };
  } catch (error) {
    return { error: error.message };
  }
}

interface AddFavoriteProps {
  userId: string;
  productId: string;
  collection: string;
}

export async function addFavOrCart(args: AddFavoriteProps) {
  try {
    const res = await apolloClient.mutate({
      mutation: ADD_FAVORITE,
      variables: args,
    });

    const { id, productId, userId, product } = res.data.favorite;

    const productFragmentData = getFragmentData(PRODUCT_FRAGMENT, product);

    return {
      favorite: { id, productId, userId, product: productFragmentData },
    };
  } catch (error) {
    return { error: error.message };
  }
}

export async function deleteFavOrCart(favoritId: string, collection: string) {
  try {
    const res = await apolloClient.mutate({
      mutation: DELETE_FAVORITE,
      variables: { favoritId, collection },
    });

    return { favorite: res.data.favoriteData };
  } catch (error) {
    return { error: error.message };
  }
}

export async function onCheckOut(userId: string) {
  try {
    const res = await apolloClient.mutate({
      mutation: DELETE_CART,
      variables: { userId },
    });

    return { userId };
  } catch (error) {
    return { error: error.message };
  }
}
