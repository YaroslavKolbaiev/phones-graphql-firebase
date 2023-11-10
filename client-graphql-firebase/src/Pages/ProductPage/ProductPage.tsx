import { useState, useEffect } from 'react';
import { BreadCrumb } from '../../components/Breadcrumb';
import { ProductCard } from '../../components/ProductCard';
import { SortMenu } from '../../components/SortMenu';
import { NoProductsWaring } from '../../components/NoProductsWaring';
import { PRODUCT_FRAGMENT, getProducts } from '../../graphql/queries';
import { getFragmentData } from '../../generated';
import ProductCardSkeleton from '../../components/ProductCard/ProductCard-Skeleton';
import { title } from '../../utils/titleHelper';
import Observer from '../../components/Observer/Observer';
import { useAppSelector } from '../../hooks/ReduxApp';
import { Filter } from '../../components/Filter';
import {
  useEndOfData,
  useProductsByFilter,
  useProductsByType,
} from '../../redux/reduxHelpers';

type Props = {
  type: string;
};

export const ProductPage: React.FC<Props> = ({ type }) => {
  const { endOfData } = useAppSelector((state) => state.endOfData);
  const { filteredProducts, productsByType, filterQuery, sort } =
    useAppSelector((state) => state.productsByType);

  const { setProductsByFilter } = useProductsByFilter();
  const { setProductsByType } = useProductsByType();
  const { setEndOfData } = useEndOfData();

  const [isLoading, setIsLoading] = useState(false);

  const fetchProducts = async (startAt: string | null) => {
    const options = {
      type,
      limit: 10,
      startAt,
    };

    setIsLoading(true);

    const { products, error } = await getProducts(options);

    if (error) {
      return setIsLoading(false);
    }

    const productsWithFragment = getFragmentData(
      PRODUCT_FRAGMENT,
      products.products
    );

    if (!productsWithFragment) {
      setIsLoading(false);
      setEndOfData(true);
      return;
    }

    setProductsByType([...productsByType, ...productsWithFragment]);
    setProductsByFilter(filterQuery, sort);

    setIsLoading(false);
  };

  useEffect(() => {
    fetchProducts(null);
  }, [type]);

  return (
    <>
      <div className="section py-3">
        <div className="container">
          <BreadCrumb />
        </div>
      </div>

      <div className="section">
        <div className="container">
          <h1 className="title has-text-weight-bold">{title(type)}</h1>
          <p className="has-text-grey-light">
            {productsByType.length
              ? `${productsByType.length} models`
              : 'no products yet'}
          </p>
        </div>
      </div>

      <div className="section is-flex-grow-1">
        <div className="container">
          <div className="is-flex is-justify-content-space-between mb-6">
            <SortMenu />
            <Filter />
          </div>

          <div
            className="columns
              is-multiline
            "
          >
            {!productsByType.length && !isLoading && <NoProductsWaring />}
            {filteredProducts.map((product) => (
              <div
                className="column
                  is-one-quarter-desktop
                  is-one-third-tablet
                "
                key={product.id}
              >
                <div className="productCard__wraper">
                  <ProductCard product={product} />
                </div>
              </div>
            ))}
            {isLoading &&
              ['1', '2', '3', '4'].map((id) => (
                <div
                  className="column
                    is-one-quarter-desktop
                    is-one-third-tablet
                  "
                  key={`id_${id}`}
                >
                  <div className="productCard__wraper">
                    <ProductCardSkeleton />
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
      {productsByType.length > 0 && !endOfData && (
        <Observer prods={productsByType} callback={fetchProducts} />
      )}
    </>
  );
};
