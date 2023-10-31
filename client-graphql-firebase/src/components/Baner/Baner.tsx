import { useRef } from 'react';
import Slider from 'react-slick';
import { bannerLength } from '../../utils/bannerLength';
import { BsArrowRightCircle, BsArrowLeftCircle } from 'react-icons/bs';

export const Baner = () => {
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
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 4000,
    pauseOnHover: true,
    cssEase: 'linear',
  };

  return (
    <div className="baner px-3">
      <button
        type="button"
        className="button is-paddingless baner__button"
        onClick={previous}
      >
        <BsArrowLeftCircle />
      </button>

      <div className="baner__container">
        <Slider ref={sliderRef} {...settings}>
          {bannerLength.map((item) => (
            <div key={item} className={`baner__image baner__image--${item}`} />
          ))}
        </Slider>
      </div>

      <button
        type="button"
        className="button is-paddingless baner__button"
        onClick={next}
      >
        <BsArrowRightCircle />
      </button>
    </div>
  );
};
