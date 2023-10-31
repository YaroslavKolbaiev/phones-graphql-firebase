import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import { useAppSelector } from '../../../hooks/ReduxApp';

type Props = {
  productId: string;
};

export const CardButtons: React.FC<Props> = ({ productId }) => {
  const { favorites } = useAppSelector((state) => state.favorites);

  const isFavourite = favorites?.some(
    (favProduct) => favProduct.productId === productId
  );

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
      <button
        type="button"
        className="button"
        // onClick={handleFavorites}
      >
        <span className="icon">
          {isFavourite ? (
            <AiFillHeart size="24px" className="has-text-danger-dark" />
          ) : (
            <AiOutlineHeart size="24px" />
          )}
        </span>
      </button>
    </p>
  );
};
