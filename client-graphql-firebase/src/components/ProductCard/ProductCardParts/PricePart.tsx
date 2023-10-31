import { ProductDetailsFragment } from '../../../generated/graphql';

type Props = {
  product: ProductDetailsFragment;
};

export const PricePart: React.FC<Props> = ({ product }) => {
  const newPrice = Math.round(
    product.price - (product.discount / 100) * product.price
  );
  return (
    <div className="mb-2">
      {product.discount !== 0 ? (
        <>
          <span className="py-2 has-text-weight-bold">{`$${newPrice}`}</span>
          <span>&nbsp;&nbsp;</span>
          <span className="has-text-grey-light py-2 productCard__old-price">{`$${product.price}`}</span>
        </>
      ) : (
        <span className="py-2 has-text-weight-bold">{`$${product.price}`}</span>
      )}
    </div>
  );
};
