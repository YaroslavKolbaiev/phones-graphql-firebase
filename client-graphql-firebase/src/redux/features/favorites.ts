import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { PRODUCT_FRAGMENT, getFavorites } from '../../graphql/queries';
import { getFragmentData } from '../../generated';
import { ProductDetailsFragment } from '../../generated/graphql';

export interface Favorites {
  id: string;
  productId: string;
  userId: string;
  product?: ProductDetailsFragment;
}

const initialState: { favorites: Favorites[] } = {
  favorites: [],
};

export const initFavorites = createAsyncThunk(
  'favorites/fetch',
  async (userId: string) => {
    const { favorites } = await getFavorites(userId);

    const favoritesWithFragment: Favorites[] = [];

    favorites.forEach((fav) => {
      const { id, productId, userId, product } = fav;

      const productFragmentData = getFragmentData(PRODUCT_FRAGMENT, product);

      favoritesWithFragment.push({
        id,
        productId,
        userId,
        product: productFragmentData,
      });
    });

    return favoritesWithFragment;
  }
);

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    add: (state, action: PayloadAction<Favorites>) => {
      state.favorites.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(initFavorites.fulfilled, (state, action) => {
      state.favorites = action.payload;
    });
  },
});

export const { actions } = favoritesSlice;
export default favoritesSlice.reducer;
