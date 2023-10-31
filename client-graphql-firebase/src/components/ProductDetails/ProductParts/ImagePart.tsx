import { ProductDetailsFragment } from '../../../generated/graphql';
import { ProductSpecs } from '../../../types/ProductSpecs';

export const ImagePart = ({ imageUrl }: { imageUrl: string }) => (
  <div className="column is-half">
    <div className="columns">
      <div className="column">
        <div className="image">
          <img src={imageUrl} alt="Image must be here" />
        </div>
      </div>
    </div>
  </div>
);
