import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getFavOrCart } from '../../graphql/queries';
import { Favorites } from '../../generated/graphql';

const FAVORITES = 'favorites';

const initialState: { favorites: Favorites[] } = {
  favorites: [],
};

export const initFavorites = createAsyncThunk(
  'favorites/fetch',
  async (userId: string) => {
    const { favorites } = await getFavOrCart(userId, favoritesSlice.name);

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

export const { actions, name } = favoritesSlice;
export default favoritesSlice.reducer;
