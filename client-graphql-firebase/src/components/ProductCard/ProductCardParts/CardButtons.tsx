import { useMemo } from 'react';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import { useAppSelector } from '../../../hooks/ReduxApp';
import { name as favoritesCollection } from '../../../redux/features/favorites';
import { name as cartCollection } from '../../../redux/features/cart';
import {
  useAddCart,
  useAddFavorite,
  useDeleteCart,
  useDeleteFavorite,
} from '../../../hooks/cartAndFavs';

type Props = {
  productId: string;
  userId: string;
};

export const CardButtons: React.FC<Props> = ({ productId, userId }) => {
  const { favorites } = useAppSelector((state) => state.favorites);
  const { cart } = useAppSelector((state) => state.cart);

  const { addCart } = useAddCart();
  const { deleteCart } = useDeleteCart();
  const { addFavorite } = useAddFavorite();
  const { deleteFavorite } = useDeleteFavorite();

  const isFavourite = useMemo(() => {
    return favorites.find((favProduct) => favProduct.productId === productId);
  }, [favorites]);

  const isCart = useMemo(() => {
    return cart.find((cartProduct) => cartProduct.productId === productId);
  }, [cart]);

  return (
    <p className="buttons">
      {isCart ? (
        <button
          type="button"
          className="button
            p-0
            card-footer-item
            has-background-white
            has-text-success
          "
          onClick={() =>
            deleteCart({ id: isCart.id, collection: cartCollection })
          }
        >
          Added to cart
        </button>
      ) : (
        <button
          type="button"
          className="button
            p-0
            card-footer-item
            has-background-dark
            has-text-light
           "
          onClick={() =>
            addCart({ productId, userId, collection: cartCollection })
          }
        >
          Add to cart
        </button>
      )}
      {isFavourite ? (
        <button
          onClick={() =>
            deleteFavorite({
              id: isFavourite.id,
              collection: favoritesCollection,
            })
          }
          type="button"
          className="button"
        >
          <span className="icon">
            <AiFillHeart size="24px" className="has-text-danger-dark" />
          </span>
        </button>
      ) : (
        <button
          type="button"
          className="button"
          onClick={() =>
            addFavorite({ productId, userId, collection: favoritesCollection })
          }
        >
          <span className="icon">
            <AiOutlineHeart size="24px" />
          </span>
        </button>
      )}
    </p>
  );
};
