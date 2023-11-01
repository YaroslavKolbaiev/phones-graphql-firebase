import { Favorites, Product } from '../generated/schema.js';
import { connection } from './connection.js';
import { getProduct } from './products.js';

export async function favProducts(productId: string) {
  const collectionRef = connection.collection('products').doc(productId);

  const snapshot = await collectionRef.get();

  const product = { id: productId, ...snapshot.data() };

  // return snapshot.data() as Product;
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

interface AddFavProps {
  productId: string;
  userId: string;
}

export async function addFavorite(args: AddFavProps) {
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
