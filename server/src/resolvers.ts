import { GraphQLError } from 'graphql';
import { getProduct, getProducts } from './firebase/products.js';
import { Resolvers } from './generated/schema.js';
import {
  addFavorite,
  deleteFavorite,
  favProducts,
  favoritesByUser,
} from './firebase/favProducts.js';

export const resolvers: Resolvers = {
  Query: {
    products: async (_root, { type, limit, startAt, sort }) => {
      return type
        ? await getProducts({ type, limit, startAt, sort })
        : await getProducts({});
    },
    product: async (_root, { id }) => {
      const product = await getProduct(id);

      if (!product) {
        throw notFoundError(`No product found with id ${id}`);
      }

      return product;
    },
    favorites: async (_root, { userId, collection }) =>
      favoritesByUser(userId, collection),
  },
  Favorites: {
    product: (parentIsFavorites) => {
      return favProducts(parentIsFavorites.productId);
    },
  },
  Mutation: {
    addFavorite: (_root, args) => addFavorite(args),
    deleteFavorite: (_root, { favoritId, collection }) =>
      deleteFavorite({ favoritId, collection }),
  },
};

function notFoundError(message: string) {
  return new GraphQLError(message, {
    extensions: { code: 'NOT_FOUND' },
  });
}
