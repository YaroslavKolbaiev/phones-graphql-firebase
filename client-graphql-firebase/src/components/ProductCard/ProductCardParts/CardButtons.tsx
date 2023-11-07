import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import { useAppDispatch, useAppSelector } from '../../../hooks/ReduxApp';
import {
  actions as favoritesActions,
  name as favoritesCollection,
} from '../../../redux/features/favorites';
import { addFavOrCart, deleteFavOrCart } from '../../../graphql/queries';

type Props = {
  productId: string;
  userId: string;
};

export const CardButtons: React.FC<Props> = ({ productId, userId }) => {
  const dispatch = useAppDispatch();
  const { favorites } = useAppSelector((state) => state.favorites);

  const isFavourite = favorites?.some(
    (favProduct) => favProduct.productId === productId
  );

  const onAddFavorite = async () => {
    const { favorite, error } = await addFavOrCart({
      productId,
      userId,
      collection: favoritesCollection,
    });

    if (error) {
      alert(error);
    }

    return dispatch(favoritesActions.add(favorite));
  };

  const onDeleteFavorite = async () => {
    const findFavorite = favorites.find((fav) => fav.productId === productId);

    const { favorite, error } = await deleteFavOrCart(
      findFavorite.id,
      favoritesCollection
    );

    if (error) {
      alert(error);
    }

    return dispatch(favoritesActions.delete(favorite));
  };

  return (
    <p className="buttons">
      {false ? (
        <button
          type="button"
          className="button
            p-0
            card-footer-item
            has-background-white
            has-text-success
          "
          // onClick={removeFromCart}
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
          // onClick={addToCart}
        >
          Add to cart
        </button>
      )}
      {isFavourite ? (
        <button onClick={onDeleteFavorite} type="button" className="button">
          <span className="icon">
            <AiFillHeart size="24px" className="has-text-danger-dark" />
          </span>
        </button>
      ) : (
        <button type="button" className="button" onClick={onAddFavorite}>
          <span className="icon">
            <AiOutlineHeart size="24px" />
          </span>
        </button>
      )}
    </p>
  );
};
