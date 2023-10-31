import { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { ProductsContext } from '../../../context/ProductsContext';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';

export const CartAndFavButtons = () => {
  const { productId = '' } = useParams();

  const { products, favProducts, setFavProducts, cart, setCart } =
    useContext(ProductsContext);

  const currentProduct = products.filter(
    (product) => product.id === productId
  )[0];

  const isCartItem = cart.some(
    (cartitem) => cartitem.id === currentProduct?.id
  );

  const removeFromCart = () => {
    setCart(cart.filter((cartItem) => cartItem.id !== currentProduct.id));
  };

  const addToCart = () => setCart([...cart, currentProduct]);

  const isFavourite = favProducts.some((x) => x.id === currentProduct?.id);

  const favoritesHandler = () => {
    setFavProducts(
      isFavourite
        ? favProducts.filter((x) => x.id !== currentProduct.id)
        : [...favProducts, currentProduct]
    );
  };

  return (
    <p className="buttons">
      {isCartItem ? (
        <button
          type="button"
          className="
            button
            card-footer-item
            has-background-white
            has-text-success
         "
          onClick={removeFromCart}
        >
          Added to cart
        </button>
      ) : (
        <button
          type="button"
          className="
            button
            card-footer-item
            has-background-dark
            has-text-light
         "
          onClick={addToCart}
        >
          Add to cart
        </button>
      )}
      <button type="button" className="button" onClick={favoritesHandler}>
        <span className="icon is-small">
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
