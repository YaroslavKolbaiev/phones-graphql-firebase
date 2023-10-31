import { Link } from 'react-router-dom';
import { srollToTop } from '../../utils/scrollToTop';
import { useFilter, useProductsByType } from '../../redux/reduxHelpers';

interface Props {
  bg: string;
  imageUrl: string;
  name: string;
  title: string;
  total: number | null;
}

const CategoryLink = ({ bg, imageUrl, name, title, total }: Props) => {
  const isNotZero = total > 0;
  const { setProductsByType } = useProductsByType();
  const { setFilterQuery } = useFilter();
  return (
    <div className="column">
      <Link
        to={name}
        onClick={() => {
          srollToTop();
          setProductsByType([]);
          setFilterQuery('');
        }}
      >
        <figure
          style={{ backgroundColor: bg }}
          className="image is-square mb-5"
        >
          <img src={imageUrl} alt={title} />
        </figure>
        <p className="has-text-dark has-text-weight-semibold is-size-4">
          {title}
        </p>
        {total === null ? (
          <img src="/img/dots.svg" alt="dots" />
        ) : (
          <p className="has-text-grey-light">
            {isNotZero ? `${total} models` : 'no products yes'}
          </p>
        )}
      </Link>
    </div>
  );
};

export default CategoryLink;
