import { useRef } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { ReactComponent as ArrowLeft } from '../../img/icons/VectorLeft.svg';
import { ReactComponent as ArrowRight } from '../../img/icons/VectorRight.svg';
import { ProductCard } from '../ProductCard';
import { ProductDetailsFragment } from '../../generated/graphql';
import ProductCardSkeleton from '../ProductCard/ProductCard-Skeleton';

type Props = {
  products: ProductDetailsFragment[];
  title: string;
};

export const ReactSlider: React.FC<Props> = ({ products, title }) => {
  const sliderRef = useRef<Slider | null>(null);

  const next = () => {
    if (sliderRef.current) {
      sliderRef.current.slickNext();
    }
  };

  const previous = () => {
    if (sliderRef.current) {
      sliderRef.current.slickPrev();
    }
  };

  const settings = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1216,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 880,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 610,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div>
      <nav className="level is-mobile px-3">
        <div className="level-left">
          <div className="level-item">
            <h1 className="title has-text-weight-bold">{title}</h1>
          </div>
        </div>
        <div className="level-right">
          <div className="level-item">
            <button
              type="button"
              className="button is-small"
              onClick={previous}
            >
              <ArrowLeft />
            </button>
          </div>
          <div className="level-item">
            <button type="button" className="button is-small" onClick={next}>
              <ArrowRight />
            </button>
          </div>
        </div>
      </nav>

      <Slider ref={sliderRef} {...settings}>
        {products.length
          ? products.map((product) => (
              <div key={product.id} className="column px-3 py-0">
                <div className="productCard__wraper">
                  <ProductCard product={product} />
                </div>
              </div>
            ))
          : ['1', '2', '3', '4'].map((skeleton) => (
              <div key={`id-${skeleton}`} className="column px-3 py-0">
                <div className="productCard__wraper">
                  <ProductCardSkeleton />
                </div>
              </div>
            ))}
      </Slider>
    </div>
  );
};
