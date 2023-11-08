import { addFavOrCart, deleteFavOrCart } from '../graphql/queries';
import { useAppDispatch } from './ReduxApp';
import { actions as cartActions } from '../redux/features/cart';
import { actions as favoritesActions } from '../redux/features/favorites';

interface DeleteCartOrFavsProps {
  id: string;
  collection: string;
}

interface AddCartOrFavsProps {
  productId: string;
  userId: string;
  collection: string;
}

export const useDeleteCart = () => {
  const dispatch = useAppDispatch();

  const deleteCart = async ({ id, collection }: DeleteCartOrFavsProps) => {
    const { favorite, error } = await deleteFavOrCart(id, collection);

    if (error) {
      return alert(error);
    }

    return dispatch(cartActions.delete(favorite.id));
  };

  return { deleteCart };
};

export const useAddCart = () => {
  const dispatch = useAppDispatch();

  const addCart = async ({
    productId,
    userId,
    collection,
  }: AddCartOrFavsProps) => {
    const { favorite, error } = await addFavOrCart({
      productId,
      userId,
      collection,
    });

    if (error) {
      return alert(error);
    }

    return dispatch(cartActions.add({ ...favorite, quantity: 1 }));
  };

  return { addCart };
};

export const useAddFavorite = () => {
  const dispatch = useAppDispatch();

  const addFavorite = async ({
    productId,
    userId,
    collection,
  }: AddCartOrFavsProps) => {
    const { favorite, error } = await addFavOrCart({
      productId,
      userId,
      collection,
    });

    if (error) {
      return alert(error);
    }

    return dispatch(favoritesActions.add(favorite));
  };

  return { addFavorite };
};

export const useDeleteFavorite = () => {
  const dispatch = useAppDispatch();

  const deleteFavorite = async ({ id, collection }: DeleteCartOrFavsProps) => {
    const { favorite, error } = await deleteFavOrCart(id, collection);

    if (error) {
      return alert(error);
    }

    return dispatch(favoritesActions.delete(favorite));
  };

  return { deleteFavorite };
};
