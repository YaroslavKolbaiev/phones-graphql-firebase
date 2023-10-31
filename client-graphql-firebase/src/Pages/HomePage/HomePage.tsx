import { useMemo, useState, useEffect } from 'react';
import { getFragmentData } from '../../generated/fragment-masking';
import { Baner } from '../../components/Baner';
import { ReactSlider } from '../../components/ReactSlider';
import { Category } from '../../components/Category';
import { PRODUCT_FRAGMENT, getProducts } from '../../graphql/queries';
import { ProductSublist } from '../../generated/graphql';

export const HomePage: React.FC = () => {
  const [products, setProducts] = useState<ProductSublist>({
    products: [],
    totalPhones: null,
    totalTablets: null,
    totalAccessories: null,
  });

  useEffect(() => {
    (async () => {
      const {
        products: { products, totalPhones, totalTablets, totalAccessories },
      } = await getProducts({});
      const productsWithFragment = getFragmentData(PRODUCT_FRAGMENT, products);

      setProducts({
        products: [...productsWithFragment],
        totalPhones,
        totalTablets,
        totalAccessories,
      });
    })();
  }, []);

  const hotPrices = useMemo(() => {
    return products.products
      .filter((product) => product.discount)
      .map((product) => ({
        ...product,
        newPrice: (
          product.price -
          (product.discount * product.price) / 100
        ).toString(),
      }));
  }, [products]);

  const brandNewModels = useMemo(() => {
    return products.products
      .filter((product) => product.age === 0)
      .sort((a, b) => {
        return b.price - a.price;
      });
  }, [products]);

  return (
    <>
      <div className="section">
        <div className="container">
          <Baner />
        </div>
      </div>

      <div className="section">
        <div className="container">
          <ReactSlider products={hotPrices} title="Hot Prices" />
        </div>
      </div>

      <div className="section">
        <div className="container">
          <h1 className="title has-text-weight-bold px-3">Shop by category</h1>
          <Category
            totalProducts={{
              totalAccessories: products.totalAccessories,
              totalPhones: products.totalPhones,
              totalTablets: products.totalTablets,
            }}
          />
        </div>
      </div>

      <div className="section">
        <div className="container">
          <ReactSlider products={brandNewModels} title="New models" />
        </div>
      </div>
    </>
  );
};
