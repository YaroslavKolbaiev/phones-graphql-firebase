import { ProductDetailsFragment } from '../../../generated/graphql';
import { ProductSpecs } from '../../../types/ProductSpecs';

type Props = {
  capacity: string[];
};

export const CapacityButton: React.FC<Props> = ({ capacity }) => (
  <>
    <p
      className="
        is-size-7
        has-text-grey
        has-text-weight-semibold
        mb-2
      "
    >
      Select Capacity
    </p>
    <div style={{ gap: '10px' }} className="is-flex">
      {capacity?.map((option) => (
        <button
          key={option}
          type="button"
          className="button is-outlined is-dark is-small"
        >
          {option}
        </button>
      ))}
    </div>
  </>
);
