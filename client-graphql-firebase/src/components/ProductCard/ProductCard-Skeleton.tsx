const ProductCardSkeleton = () => {
  return (
    <div className="card is-shadowless productCard productCard__skeleton">
      <div className="productCard__skeleton-image productCard__skeleton-animation"></div>
      <div className="productCard__skeleton-content">
        <p className="productCard__skeleton-line productCard__skeleton-animation"></p>
        <p className="productCard__skeleton-line productCard__skeleton-animation"></p>
        <p className="productCard__skeleton-line productCard__skeleton-animation"></p>
        <p className="productCard__skeleton-line productCard__skeleton-animation"></p>
        <p className="productCard__skeleton-lastLine productCard__skeleton-animation"></p>
      </div>
    </div>
  );
};

export default ProductCardSkeleton;
