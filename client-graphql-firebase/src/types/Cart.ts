import { ProductDetailsFragment } from '../generated/graphql';

export interface CardItem extends ProductDetailsFragment {
  quantity: number;
}
