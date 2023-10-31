import { Link } from 'react-router-dom';
import { srollToTop } from '../../utils/scrollToTop';
import { CardButtons } from './ProductCardParts/CardButtons';
import { PricePart } from './ProductCardParts/PricePart';
import { SpecsPart } from './ProductCardParts/SpecsPart';
import { ProductDetailsFragment } from '../../generated/graphql';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import PlaceholderImage from '../../img/placeholder.jpg';
import { useAppSelector } from '../../hooks/ReduxApp';

type Props = {
  product: ProductDetailsFragment;
};

export const ProductCard: React.FC<Props> = ({ product }) => {
  const { userData } = useAppSelector((state) => state.user);
  return (
    <div className="card is-shadowless productCard">
      <Link
        className="has-text-dark"
        to={`/${product.type}s/${product.id}`}
        onClick={srollToTop}
      >
        <LazyLoadImage
          style={{ height: '320px', objectFit: 'cover' }}
          src={product.imageUrl}
          height="320px"
          width="100%"
          placeholderSrc={PlaceholderImage}
          alt="image"
        />
      </Link>
      <div className="card-content">
        <div className="productCard__title mb-2">
          {product.name} {product.model}
        </div>
        <PricePart product={product} />
        <hr className="mb-2 mt-0" />
        <SpecsPart product={product} />

        {userData && <CardButtons productId={product.id} />}
      </div>
    </div>
  );
};
