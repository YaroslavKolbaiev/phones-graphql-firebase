import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { BreadCrumb } from '../Breadcrumb';
import { ReactSlider } from '../ReactSlider';
import { CapacityButton } from './ProductParts/CapacityButton';
import { ColorsPart } from './ProductParts/ColorsPart';
import { ImagePart } from './ProductParts/ImagePart';
import { MainSpecs } from './ProductParts/MainSpecs';
import { PricePart } from './ProductParts/PricePart';
import { ReturnButton } from './ProductParts/ReturnButton';
import { TechSpecs } from './ProductParts/TechSpecs';
import { ProductDetailsFragment } from '../../generated/graphql';
import { PRODUCT_FRAGMENT, getProduct } from '../../graphql/queries';
import { getFragmentData } from '../../generated';
import { useAppDispatch, useAppSelector } from '../../hooks/ReduxApp';
import * as productsActions from '../../redux/features/productsForSlider';
import { CardButtons } from '../ProductCard/ProductCardParts/CardButtons';

export const ProductDetails: React.FC = () => {
  const dispatch = useAppDispatch();
  const { productsForSlider } = useAppSelector(
    (state) => state.productsForSlider
  );
  const { userData } = useAppSelector((state) => state.user);

  const { productId } = useParams();
  const [product, setProduct] = useState<ProductDetailsFragment>(null);

  const fetchProduct = async () => {
    const { product, error } = await getProduct(productId);

    if (error) {
      return;
    }

    const productsWithFragment = getFragmentData(PRODUCT_FRAGMENT, product);

    setProduct(productsWithFragment);
  };

  useEffect(() => {
    fetchProduct();
    dispatch(productsActions.init());
  }, [productId]);

  return (
    <>
      <section className="section">
        <div className="container px-3">
          <BreadCrumb name={product?.name} model={product?.model} />
          <ReturnButton />
          <h1 className="title">{product?.name}</h1>
          <div className="columns is-variable is-6 mb-6">
            <ImagePart imageUrl={product?.imageUrl} />
            <div className="column">
              <div className="columns is-mobile">
                <div className="column is-two-thirds">
                  <ColorsPart />
                  <hr />
                  <CapacityButton capacity={product?.capacity} />
                  <hr />
                  <PricePart
                    price={product?.price}
                    discount={product?.discount}
                  />
                  {userData ? (
                    <CardButtons productId={productId} userId={userData.uid} />
                  ) : (
                    <Link to="/auth">
                      <button
                        type="button"
                        className="button
                          is-fullwidth
                          p-0
                          card-footer-item
                          has-background-dark
                          has-text-light

                        "
                      >
                        Login to Purchase
                      </button>
                    </Link>
                  )}
                  <MainSpecs product={product} />
                </div>
                <div className="column">
                  <p className="has-text-grey-light is-size-7 is-pulled-right">
                    ID: {product?.id}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="columns is-variable is-6">
            <div className="column is-half">
              <h3 className="title is-3">About</h3>
              <hr />
              <p className="has-text-grey-light is-size-7">
                {product?.snippet}
              </p>
            </div>
            <TechSpecs product={product} />
          </div>
        </div>
      </section>
      <div className="section">
        <div className="container">
          <ReactSlider products={productsForSlider} title="You may also like" />
        </div>
      </div>
    </>
  );
};
