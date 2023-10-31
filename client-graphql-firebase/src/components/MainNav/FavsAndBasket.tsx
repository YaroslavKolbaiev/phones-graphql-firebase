import classNames from 'classnames';
import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { ProductsContext } from '../../context/ProductsContext';
import { AiOutlineHeart } from 'react-icons/ai';
import { BsBasket3 } from 'react-icons/bs';
import { useAppSelector } from '../../hooks/ReduxApp';

export const FavsAndBasket: React.FC = () => {
  // const { favProducts, cart } = useContext(ProductsContext);

  const { favorites } = useAppSelector((state) => state.favorites);

  return (
    <>
      <NavLink
        to="favourites"
        className={({ isActive }) =>
          classNames('navbar-item navibar__icon is-justify-content-center', {
            'navibar__item--active': isActive,
          })
        }
      >
        {favorites.length ? (
          <AiOutlineHeart
            size="24px"
            className="navibar__icon--hidden 
              has-badge-rounded 
              has-badge-danger
            "
            data-badge={favorites.length}
          />
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
        {false ? (
          <BsBasket3
            size="24px"
            className="navibar__icon--hidden 
              has-badge-rounded
              has-badge-danger
            "
            // data-badge={cart.length}
          />
        ) : (
          <BsBasket3 size="24px" className="navibar__icon--hidden" />
        )}
        <span className="navibar__icon-text">Basket</span>
      </NavLink>
    </>
  );
};
