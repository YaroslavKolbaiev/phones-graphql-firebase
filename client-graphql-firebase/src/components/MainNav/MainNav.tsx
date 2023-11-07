import classNames from 'classnames';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useState, useRef, useContext } from 'react';
import { CSSTransition } from 'react-transition-group';
import { Burger } from '../Burger';
import { PageNavLink } from '../PageNavLink';
import { FavsAndBasket } from './FavsAndBasket';
import { useAppSelector } from '../../hooks/ReduxApp';
import { AiOutlineUser } from 'react-icons/ai';

export const MainNav: React.FC = () => {
  const { userData } = useAppSelector((state) => state.user);

  const [burgerActive, setBurgerActive] = useState(false);
  const location = useLocation()
    .pathname.split('/')
    .filter((x) => x)
    .join('');
  const nodeRef = useRef(null);

  return (
    <nav
      className="navbar is-transparent navibar"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="navbar-brand">
        <Link to="/" className="navbar-item px-0 mr-6 ml-5">
          <span className="navibar__logo" />
        </Link>
        <Burger burgerActive={burgerActive} setBurgerActive={setBurgerActive} />
      </div>
      <CSSTransition
        in={burgerActive}
        nodeRef={nodeRef}
        timeout={300}
        classNames="navibar__transition"
      >
        <div
          className={classNames('navbar-menu', { 'is-active': burgerActive })}
          id="navMenu"
          ref={nodeRef}
        >
          <div className="navbar-start navibar--start">
            <Link
              to="/"
              className={classNames('navbar-item has-text-dark', {
                'navibar__item--active': useLocation().pathname === '/',
              })}
            >
              Home
            </Link>
            <PageNavLink text="Phones" to="phones" />
            <PageNavLink text="Tablets" to="tablets" />
            <PageNavLink text="Accessories" to="accessories" />
          </div>
          {userData ? (
            <>
              <NavLink to="/userPage" className="navbar-item has-text-dark">
                <span className="icon navibar__icon--hidden">
                  <AiOutlineUser size="24px" />
                </span>
                <span className="navibar__icon-text">User Profile</span>
              </NavLink>
              <FavsAndBasket />
            </>
          ) : (
            <PageNavLink text="Login" to="auth" />
          )}
        </div>
      </CSSTransition>
    </nav>
  );
};
