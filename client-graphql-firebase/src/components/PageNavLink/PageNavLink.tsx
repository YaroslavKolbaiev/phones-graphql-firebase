import classNames from 'classnames';
import { NavLink } from 'react-router-dom';
import {
  useEndOfData,
  useFilter,
  useProductsByType,
} from '../../redux/reduxHelpers';

type Props = {
  to: string;
  text: string;
};

export const PageNavLink: React.FC<Props> = ({ text, to }) => {
  const { setProductsByType } = useProductsByType();
  const { setEndOfData } = useEndOfData();
  const { setFilterQuery } = useFilter();

  return (
    <NavLink
      to={to}
      onClick={() => {
        setEndOfData(false);
        setFilterQuery('');
        setProductsByType([]);
      }}
      className={({ isActive }) =>
        classNames('navbar-item has-text-dark', {
          'navibar__item--active': isActive,
        })
      }
    >
      {text}
    </NavLink>
  );
};
