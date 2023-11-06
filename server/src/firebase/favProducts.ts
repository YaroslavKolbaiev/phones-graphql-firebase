import { Favorites, Product } from '../generated/schema.js';
import { connection } from './connection.js';

export async function favProducts(productId: string) {
  const collectionRef = connection.collection('products').doc(productId);

  const snapshot = await collectionRef.get();

  const product = { id: productId, ...snapshot.data() };

  return product as Product;
}

export async function favoritesByUser(userId: string) {
  const collectionRef = connection.collection('favorites');

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

interface Favs {
  productId: string;
  userId: string;
}

export async function addFavorite(args: Favs) {
  const collectionRef = connection.collection('favorites');
  const snapshot = await collectionRef
    .where('productId', '==', args.productId)
    .get();

  if (!snapshot.empty) {
    throw new Error('Product has been already added to favorites');
  }

  const res = await collectionRef.add(args);

  const favorite = {
    id: res.id,
    userId: args.userId,
    productId: args.productId,
  };

  return favorite;
}

export async function deleteFavorite(favId: string) {
  const favRef = connection.collection('favorites').doc(favId);

  const favoriteToBeDeleted = (await favRef.get()).data() as Favs;

  if (!favoriteToBeDeleted) {
    throw new Error('Product not found');
  }

  await favRef.delete();

  return { id: favRef.id, ...favoriteToBeDeleted };
}
