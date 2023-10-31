import { ProductDetailsFragment } from '../../../generated/graphql';

type Props = {
  product: ProductDetailsFragment;
};

export const SpecsPart: React.FC<Props> = ({ product }) => {
  return (
    <>
      <div className="is-flex is-justify-content-space-between">
        <p className="has-text-grey-light">screen</p>
        <p className="has-text-weight-semibold">{product.screen}</p>
      </div>
      <div className="is-flex is-justify-content-space-between">
        <p className="has-text-grey-light">camera</p>
        <p className="has-text-weight-semibold">{product.camera}</p>
      </div>
      <div className="is-flex is-justify-content-space-between mb-2">
        <p className="has-text-grey-light">RAM</p>
        <p className="has-text-weight-semibold">{product.ram}</p>
      </div>
    </>
  );
};
