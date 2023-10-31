import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ProductDetailsFragment } from '../../generated/graphql';
import { getProducts, PRODUCT_FRAGMENT } from '../../graphql/queries';
import { getFragmentData } from '../../generated';

const initialState: { productsForSlider: ProductDetailsFragment[] } = {
  productsForSlider: [],
};

export const init = createAsyncThunk('products/fetch', async () => {
  const {
    products: { products },
  } = await getProducts({});

  const productsWithFragment = getFragmentData(PRODUCT_FRAGMENT, products);

  return productsWithFragment;
});

const productsForSliderSlice = createSlice({
  name: 'productsForSlider',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(init.fulfilled, (state, action) => {
      state.productsForSlider = [...action.payload];
    });
  },
});

export const { actions } = productsForSliderSlice;
export default productsForSliderSlice.reducer;
