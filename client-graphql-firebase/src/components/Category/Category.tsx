import { Link } from 'react-router-dom';
import Phones from '../../img/Category/Category1.png';
import Tablets from '../../img/Category/Category2.png';
import Accessories from '../../img/Category/Category3.png';
import { srollToTop } from '../../utils/scrollToTop';
import { ProductDetailsFragment } from '../../generated/graphql';
import CategoryLink from './CategoryLink';

interface Props {
  totalProducts: {
    totalAccessories: number;
    totalPhones: number;
    totalTablets: number;
  };
}

export const Category = ({
  totalProducts: { totalAccessories, totalPhones, totalTablets },
}: Props) => {
  return (
    <div className="columns px-3">
      <CategoryLink
        bg="#fcdbc1"
        imageUrl={Phones}
        name="phones"
        title="Mobile Phones"
        total={totalPhones}
      />
      <CategoryLink
        bg="#8d8d92"
        imageUrl={Tablets}
        name="tablets"
        title="Tablets"
        total={totalTablets}
      />
      <CategoryLink
        bg="#973d5f"
        imageUrl={Accessories}
        name="accessories"
        title="Accessories"
        total={totalAccessories}
      />
    </div>
  );
};
