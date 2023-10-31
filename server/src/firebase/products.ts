import { ProductSublist, Product } from '../generated/schema.js';
import { connection } from './connection.js';

interface Props {
  type?: string;
  limit?: number;
  startAt?: string;
  sort?: string;
}

export async function getProducts(options: Props) {
  let snapshot: FirebaseFirestore.QuerySnapshot<FirebaseFirestore.DocumentData>;

  const collectionRef = connection.collection('products');

  const totalPhones = (
    await collectionRef.where('type', '==', 'phone').count().get()
  ).data().count;

  const totalTablets = (
    await collectionRef.where('type', '==', 'tablet').count().get()
  ).data().count;

  const totalAccessories = (
    await collectionRef.where('type', '==', 'accessories').count().get()
  ).data().count;

  if (options.type && !options.startAt) {
    snapshot = await connection
      .collection('products')
      .where('type', '==', options.type)
      .orderBy('createdAt', 'desc')
      .limit(options.limit)
      .get();
  } else if (options.startAt) {
    snapshot = await connection
      .collection('products')
      .where('type', '==', options.type)
      .orderBy('createdAt', 'desc')
      .startAfter(options.startAt)
      .limit(options.limit)
      .get();
  } else {
    snapshot = await connection
      .collection('products')
      .orderBy('createdAt', 'desc')
      .limit(40)
      .get();
  }

  const products = [];

  snapshot.forEach((doc) => {
    const product = {
      id: doc.id,
      ...doc.data(),
    };

    products.push(product);
  });

  return {
    products,
    totalPhones,
    totalTablets,
    totalAccessories,
  } as ProductSublist;
}

export async function getProduct(id: string) {
  const productRef = connection.collection('products').doc(id);

  const doc = await productRef.get();

  if (!doc.exists) {
    return null;
  }

  return { id: doc.id, ...doc.data() } as Product;
}
