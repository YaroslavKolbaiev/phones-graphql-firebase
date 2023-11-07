import { Favorites, Product } from '../generated/schema.js';
import { connection } from './connection.js';

export async function favProducts(productId: string) {
  const collectionRef = connection.collection('products').doc(productId);

  const snapshot = await collectionRef.get();

  const product = { id: productId, ...snapshot.data() };

  return product as Product;
}

export async function favoritesByUser(userId: string, collection: string) {
  const collectionRef = connection.collection(collection);

  const favorites = [];

  const snapshot = await collectionRef.where('userId', '==', userId).get();

  snapshot.forEach((doc) => {
    const favsObj = {
      id: doc.id,
      ...doc.data(),
    };

    favorites.push(favsObj);
  });

  return favorites as Favorites[];
}

interface AddProps {
  productId: string;
  userId: string;
  collection: string;
}

export async function addFavorite(args: AddProps) {
  const { productId, userId, collection } = args;
  const collectionRef = connection.collection(collection);
  const snapshot = await collectionRef
    .where('productId', '==', productId)
    .get();

  if (!snapshot.empty) {
    throw new Error('Product has been already added to favorites');
  }

  const res = await collectionRef.add({ productId, userId });

  const favorite = {
    id: res.id,
    userId: args.userId,
    productId: args.productId,
  };

  return favorite;
}

interface DeleteProps {
  favoritId: string;
  collection: string;
}

export async function deleteFavorite({ favoritId, collection }: DeleteProps) {
  const favRef = connection.collection(collection).doc(favoritId);

  const favoriteToBeDeleted = (await favRef.get()).data() as {
    productId: string;
    userId: string;
  };

  if (!favoriteToBeDeleted) {
    throw new Error('Product not found');
  }

  await favRef.delete();

  return { id: favRef.id, ...favoriteToBeDeleted };
}
