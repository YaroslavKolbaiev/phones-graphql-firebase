interface Props {
  price: number;
  discount: number;
}

export const PricePart = ({ price, discount }) => {
  const newPrice = Math.round(price - (discount / 100) * price);

  return (
    <div className="mb-2">
      {discount !== 0 ? (
        <>
          <span className="py-2 has-text-weight-bold">{`$${newPrice}`}</span>
          <span>&nbsp;&nbsp;</span>
          <span className="has-text-grey-light py-2 productCard__old-price">{`$${price}`}</span>
        </>
      ) : (
        <p className="py-2 has-text-weight-bold">{`$${price}`}</p>
      )}
    </div>
  );
};
