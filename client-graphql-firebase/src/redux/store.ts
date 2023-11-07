import { configureStore } from '@reduxjs/toolkit';
import endOfDataReducer from '../redux/features/endOfData';
import productsForSliderReducer from '../redux/features/productsForSlider';
import userReducer from '../redux/features/user';
import productsByTypeReducer from '../redux/features/productsByType';
import favoritesReducer from '../redux/features/favorites';
import cartReducer from '../redux/features/cart';

const store = configureStore({
  reducer: {
    endOfData: endOfDataReducer,
    productsForSlider: productsForSliderReducer,
    user: userReducer,
    productsByType: productsByTypeReducer,
    favorites: favoritesReducer,
    cart: cartReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
