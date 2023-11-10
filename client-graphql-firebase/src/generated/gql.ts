/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n  fragment productDetails on Product {\n    age\n    capacity\n    discount\n    id\n    imageUrl\n    createdAt\n    model\n    name\n    price\n    ram\n    screen\n    snippet\n    type\n    resolution\n    processor\n    camera\n  }\n": types.ProductDetailsFragmentDoc,
    "\n  query Products($type: String, $limit: Int, $startAt: String, $sort: String) {\n    products(type: $type, limit: $limit, startAt: $startAt, sort: $sort) {\n      products {\n        ...productDetails\n      }\n      totalAccessories\n      totalPhones\n      totalTablets\n    }\n  }\n": types.ProductsDocument,
    "\n  query Product($productId: ID!) {\n    product(id: $productId) {\n      ...productDetails\n    }\n  }\n": types.ProductDocument,
    "\n  query Favorites($userId: ID!, $collection: String!) {\n    favorites(userId: $userId, collection: $collection) {\n      id\n      product {\n        ...productDetails\n      }\n      productId\n      userId\n    }\n  }\n": types.FavoritesDocument,
    "\n  mutation AddFavorite(\n    $userId: String!\n    $productId: String!\n    $collection: String!\n  ) {\n    favorite: addFavorite(\n      userId: $userId\n      productId: $productId\n      collection: $collection\n    ) {\n      id\n      product {\n        ...productDetails\n      }\n      productId\n      userId\n    }\n  }\n": types.AddFavoriteDocument,
    "\n  mutation DeleteFavorite($favoritId: String!, $collection: String!) {\n    favoriteData: deleteFavorite(\n      favoritId: $favoritId\n      collection: $collection\n    ) {\n      id\n      productId\n      userId\n    }\n  }\n": types.DeleteFavoriteDocument,
    "\n  mutation Mutation($userId: String!) {\n    deleteCart(userId: $userId)\n  }\n": types.MutationDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment productDetails on Product {\n    age\n    capacity\n    discount\n    id\n    imageUrl\n    createdAt\n    model\n    name\n    price\n    ram\n    screen\n    snippet\n    type\n    resolution\n    processor\n    camera\n  }\n"): (typeof documents)["\n  fragment productDetails on Product {\n    age\n    capacity\n    discount\n    id\n    imageUrl\n    createdAt\n    model\n    name\n    price\n    ram\n    screen\n    snippet\n    type\n    resolution\n    processor\n    camera\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query Products($type: String, $limit: Int, $startAt: String, $sort: String) {\n    products(type: $type, limit: $limit, startAt: $startAt, sort: $sort) {\n      products {\n        ...productDetails\n      }\n      totalAccessories\n      totalPhones\n      totalTablets\n    }\n  }\n"): (typeof documents)["\n  query Products($type: String, $limit: Int, $startAt: String, $sort: String) {\n    products(type: $type, limit: $limit, startAt: $startAt, sort: $sort) {\n      products {\n        ...productDetails\n      }\n      totalAccessories\n      totalPhones\n      totalTablets\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query Product($productId: ID!) {\n    product(id: $productId) {\n      ...productDetails\n    }\n  }\n"): (typeof documents)["\n  query Product($productId: ID!) {\n    product(id: $productId) {\n      ...productDetails\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query Favorites($userId: ID!, $collection: String!) {\n    favorites(userId: $userId, collection: $collection) {\n      id\n      product {\n        ...productDetails\n      }\n      productId\n      userId\n    }\n  }\n"): (typeof documents)["\n  query Favorites($userId: ID!, $collection: String!) {\n    favorites(userId: $userId, collection: $collection) {\n      id\n      product {\n        ...productDetails\n      }\n      productId\n      userId\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation AddFavorite(\n    $userId: String!\n    $productId: String!\n    $collection: String!\n  ) {\n    favorite: addFavorite(\n      userId: $userId\n      productId: $productId\n      collection: $collection\n    ) {\n      id\n      product {\n        ...productDetails\n      }\n      productId\n      userId\n    }\n  }\n"): (typeof documents)["\n  mutation AddFavorite(\n    $userId: String!\n    $productId: String!\n    $collection: String!\n  ) {\n    favorite: addFavorite(\n      userId: $userId\n      productId: $productId\n      collection: $collection\n    ) {\n      id\n      product {\n        ...productDetails\n      }\n      productId\n      userId\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation DeleteFavorite($favoritId: String!, $collection: String!) {\n    favoriteData: deleteFavorite(\n      favoritId: $favoritId\n      collection: $collection\n    ) {\n      id\n      productId\n      userId\n    }\n  }\n"): (typeof documents)["\n  mutation DeleteFavorite($favoritId: String!, $collection: String!) {\n    favoriteData: deleteFavorite(\n      favoritId: $favoritId\n      collection: $collection\n    ) {\n      id\n      productId\n      userId\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation Mutation($userId: String!) {\n    deleteCart(userId: $userId)\n  }\n"): (typeof documents)["\n  mutation Mutation($userId: String!) {\n    deleteCart(userId: $userId)\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;