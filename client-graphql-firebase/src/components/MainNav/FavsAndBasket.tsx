import classNames from 'classnames';
import { NavLink } from 'react-router-dom';
import { AiOutlineHeart } from 'react-icons/ai';
import { BsBasket3 } from 'react-icons/bs';
import { useAppSelector } from '../../hooks/ReduxApp';

export const FavsAndBasket: React.FC = () => {
  const { favorites } = useAppSelector((state) => state.favorites);
  const { cart } = useAppSelector((state) => state.cart);

  return (
    <>
      <NavLink
        to="favorites"
        className={({ isActive }) =>
          classNames('navbar-item navibar__icon is-justify-content-center', {
            'navibar__item--active': isActive,
          })
        }
      >
        {favorites?.length ? (
          <div className="is-relative is-flex">
            <AiOutlineHeart size="24px" className="navibar__icon--hidden" />
            <span className="badge">{favorites?.length}</span>
          </div>
        ) : (
          <AiOutlineHeart size="24px" className="navibar__icon--hidden" />
        )}
        <span className="navibar__icon-text">Favorites</span>
      </NavLink>
      <NavLink
        to="cart"
        className={({ isActive }) =>
          classNames('navbar-item navibar__icon is-justify-content-center', {
            'navibar__item--active': isActive,
          })
        }
      >
        {cart.length ? (
          <div className="is-relative is-flex">
            <BsBasket3 size="24px" className="navibar__icon--hidden" />
            <span className="badge">{cart.length}</span>
          </div>
        ) : (
          <BsBasket3 size="24px" className="navibar__icon--hidden" />
        )}
        <span className="navibar__icon-text">Basket</span>
      </NavLink>
    </>
  );
};
