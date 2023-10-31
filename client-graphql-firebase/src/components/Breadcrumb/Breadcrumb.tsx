import { Link, useLocation } from 'react-router-dom';
import { BsFillHouseFill } from 'react-icons/bs';
import { useAppDispatch } from '../../hooks/ReduxApp';
import { actions as endOfDataActions } from '../../redux/features/endOfData';

interface Props {
  name?: string;
  model?: string;
}

export const BreadCrumb = ({ name, model }: Props) => {
  const location = useLocation().pathname.split('/');

  const dispatch = useAppDispatch();
  const setEndOfData = (valueToSet: boolean) =>
    dispatch(endOfDataActions.set(valueToSet));

  return (
    <nav className="breadcrumb has-arrow-separator" aria-label="breadcrumbs">
      <ul className="is-flex is-align-items-center">
        <li>
          <Link to="/">
            <BsFillHouseFill className="has-text-black" />
          </Link>
        </li>
        <li>
          <Link
            to={`/${location[1]}`}
            className="has-text-grey-light"
            onClick={() => setEndOfData(false)}
          >
            {location[1]}
          </Link>
        </li>
        <li>
          <Link
            to={`/${location[2]}`}
            className="has-text-grey-light"
            onClick={() => setEndOfData(false)}
          >
            {name} {model}
          </Link>
        </li>
      </ul>
    </nav>
  );
};
