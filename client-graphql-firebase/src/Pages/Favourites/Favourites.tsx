import { useSearchParams } from 'react-router-dom';
import { BreadCrumb } from '../../components/Breadcrumb';
import { NoProductsWaring } from '../../components/NoProductsWaring';
import { ProductCard } from '../../components/ProductCard';
import { useAppSelector } from '../../hooks/ReduxApp';
import { Pagination } from '../../components/Pagination';
import { useMemo } from 'react';

export const Favourites = () => {
  const { favorites } = useAppSelector((state) => state.favorites);

  const [searchParams] = useSearchParams();
  const page = searchParams.get('page') || '1';
  const itemsPerPage = 4;

  const indexOfLastItem = +page * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const paginationHidden = itemsPerPage >= favorites.length;

  const visibleFavProducts = useMemo(() => {
    return favorites.slice(indexOfFirstItem, indexOfLastItem);
  }, [page]);

  return (
    <div className="is-flex-grow-1">
      <div className="section py-3">
        <div className="container">
          <BreadCrumb />
          <h1 className="title has-text-weight-bold">Favourietes</h1>
          <p className="has-text-grey-light">
            {favorites.length
              ? `${favorites.length} models`
              : 'no products yet'}
          </p>
        </div>
      </div>

      {favorites.length !== 0 ? (
        <div className="section">
          <div className="container">
            <div
              className="
                columns
                is-mobile
                is-multiline
                "
            >
              {visibleFavProducts.map(({ product }) => (
                <div
                  key={product.id}
                  className="
                      column
                      is-one-quarter-desktop
                      is-one-third-tablet
                    "
                >
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
            {!paginationHidden && (
              <Pagination
                totalItems={favorites.length}
                itemsPerPage={itemsPerPage}
              />
            )}
          </div>
        </div>
      ) : (
        <NoProductsWaring />
      )}
    </div>
  );
};
