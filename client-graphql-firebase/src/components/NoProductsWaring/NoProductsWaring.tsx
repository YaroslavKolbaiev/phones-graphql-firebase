import NoProductImg from '../../img/noproducts/nproduct.png';

export const NoProductsWaring = () => (
  <div className="is-flex-grow-1">
    <div className="is-flex is-justify-content-center">
      <figure style={{ maxWidth: '720px' }} className="image">
        <img src={NoProductImg} alt="noProductImg" />
      </figure>
    </div>
  </div>
);
