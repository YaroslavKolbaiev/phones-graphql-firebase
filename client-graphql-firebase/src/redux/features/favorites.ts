import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { PRODUCT_FRAGMENT, getFavorites } from '../../graphql/queries';
import { getFragmentData } from '../../generated';
import { Favorites, ProductDetailsFragment } from '../../generated/graphql';

const initialState: { favorites: Favorites[] } = {
  favorites: [],
};

export const initFavorites = createAsyncThunk(
  'favorites/fetch',
  async (userId: string) => {
    const { favorites } = await getFavorites(userId);

    return favorites;
  }
);

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    add: (state, action: PayloadAction<Favorites>) => {
      state.favorites.push(action.payload);
    },
    delete: (state, action: PayloadAction<Favorites>) => {
      state.favorites = state.favorites.filter(
        (fav) => fav.id !== action.payload.id
      );
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
