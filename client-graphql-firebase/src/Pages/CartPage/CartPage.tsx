import { NoProductsWaring } from '../../components/NoProductsWaring';
import { ReturnButton } from '../../components/ProductDetails/ProductParts/ReturnButton';
import { useAppDispatch, useAppSelector } from '../../hooks/ReduxApp';
import {
  actions as cartActions,
  name as cartCollection,
} from '../../redux/features/cart';
import { ImCross } from 'react-icons/im';
import { FaMinus, FaPlus, FaDollarSign } from 'react-icons/fa';
import { useCheckout, useDeleteCart } from '../../hooks/cartAndFavs';
import { useState, useMemo } from 'react';
import { Modal } from '../../components/Modal/Cart-Modal';

export const CartPage = () => {
  const [modal, setModal] = useState(false);

  const dispatch = useAppDispatch();
  const { cart } = useAppSelector((state) => state.cart);
  const { userData } = useAppSelector((state) => state.user);

  const { deleteCart } = useDeleteCart();
  const { checkout } = useCheckout();

  const handleIncrement = (cardId: string) =>
    dispatch(cartActions.increment(cardId));
  const handleDecrement = (cardId: string) =>
    dispatch(cartActions.decrement(cardId));

  const totalPrice = useMemo(() => {
    return cart
      .map((cartItem) => cartItem.product.price * cartItem.quantity)
      .reduce((a, b) => a + b, 0);
  }, [cart]);

  const onCheckOut = () => {
    checkout(userData.uid);
    setModal(true);
  };

  return (
    <>
      <div className="section is-flex-grow-1">
        <div className="container">
          <ReturnButton />
          <h1 className="title has-text-weight-bold">Cart</h1>
          {cart.length !== 0 ? (
            <div className="columns">
              <div className="column is-two-thirds">
                {cart.map((cartItem) => {
                  const priceWithDiscount = Math.round(
                    cartItem.product.price -
                      (cartItem.product.discount / 100) * cartItem.product.price
                  );
                  return (
                    <div className="box" key={cartItem.id}>
                      <div className="is-flex is-justify-content-space-between">
                        <div
                          style={{ gap: '10px' }}
                          className="is-flex is-align-items-center"
                        >
                          <button
                            type="button"
                            className="button"
                            onClick={() => {
                              deleteCart({
                                id: cartItem.id,
                                collection: cartCollection,
                              });
                            }}
                          >
                            <span className="icon">
                              <ImCross className="has-text-danger" />
                            </span>
                          </button>
                          <p>
                            {cartItem.product.name} {cartItem.product.model}
                          </p>
                        </div>
                        <div style={{ gap: '20px' }} className="is-flex">
                          <div className="is-flex is-align-items-center">
                            <button
                              disabled={cartItem.quantity === 1}
                              type="button"
                              className="button is-small"
                              onClick={() => {
                                handleDecrement(cartItem.id);
                              }}
                            >
                              <span className="icon">
                                <FaMinus />
                              </span>
                            </button>
                            <p
                              className="has-text-centered"
                              style={{ width: 30 }}
                            >
                              {cartItem.quantity}
                            </p>
                            <button
                              disabled={cartItem.quantity === 10}
                              onClick={() => handleIncrement(cartItem.id)}
                              type="button"
                              className="button is-small"
                            >
                              <span className="icon">
                                <FaPlus />
                              </span>
                            </button>
                          </div>
                          <div
                            style={{ width: 70 }}
                            className="is-flex is-align-items-center has-text-weight-bold"
                          >
                            <FaDollarSign />
                            {cartItem.quantity * priceWithDiscount}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="column">
                <div className="box">
                  <p className="has-text-centered has-text-weight-bold is-size-4">
                    <FaDollarSign />
                    {totalPrice}
                  </p>
                  <p className="has-text-centered has-text-grey-light is-size-7">
                    {`Total for ${cart.length} items`}
                  </p>
                  <hr />
                  <button
                    onClick={onCheckOut}
                    type="button"
                    className="button is-fullwidth has-background-dark has-text-light"
                  >
                    Checkout
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <NoProductsWaring />
          )}
        </div>
      </div>
      {modal && <Modal closeModal={setModal} />}
    </>
  );
};
