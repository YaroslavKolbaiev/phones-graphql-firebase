import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ProductDetailsFragment } from '../../generated/graphql';
import { Sort } from '../../types/Sort';

type ProductsByType = {
  productsByType: ProductDetailsFragment[];
  filteredProducts: ProductDetailsFragment[];
  filterQuery: string;
  sort: Sort;
};

export type FilterPayload = {
  filter: string;
  sort: Sort;
};

const initialState: ProductsByType = {
  productsByType: [],
  filteredProducts: [],
  filterQuery: '',
  sort: Sort.CreatedAt,
};

const productsByTypeSlice = createSlice({
  name: 'productsByType',
  initialState,
  reducers: {
    set: (state, action: PayloadAction<ProductDetailsFragment[]>) => {
      state.productsByType = action.payload;
      state.filteredProducts = [...state.productsByType];
    },
    filter: (state, action: PayloadAction<FilterPayload>) => {
      state.filteredProducts = state.productsByType
        .filter((product) =>
          product.name
            .toLocaleLowerCase()
            .includes(action.payload.filter.toLocaleLowerCase())
        )
        .sort((product1, product2) => {
          switch (state.sort) {
            case Sort.CreatedAt:
              return product2.createdAt.localeCompare(product1.createdAt);

            case Sort.PriceDown:
              return product2.price - product1.price;

            case Sort.PriceUp:
              return product1.price - product2.price;

            case Sort.Discount:
              return product2.discount - product1.discount;

            // case Sort.Ram:
            //   return product2.ram.localeCompare(product1.ram);

            default:
              return 0;
          }
        });
    },
    changeQuery: (state, action: PayloadAction<string>) => {
      state.filterQuery = action.payload;
    },
    changeSort: (state, action: PayloadAction<Sort>) => {
      state.sort = action.payload;
    },
  },
});

export const { actions } = productsByTypeSlice;
export default productsByTypeSlice.reducer;
