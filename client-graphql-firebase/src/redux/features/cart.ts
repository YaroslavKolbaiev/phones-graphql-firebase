import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getFavOrCart } from '../../graphql/queries';
import { ProductDetailsFragment } from '../../generated/graphql';

interface CartProps {
  id: string;
  product?: ProductDetailsFragment;
  productId: string;
  userId: string;
  quantity: number;
}

const initialState: { cart: CartProps[] } = {
  cart: [],
};

export const initCart = createAsyncThunk(
  'cart/fetch',
  async (userId: string) => {
    const { favorites } = await getFavOrCart(userId, cartSlice.name);

    const cart = favorites.map((favItem) => {
      return { ...favItem, quantity: 1 };
    });

    return cart;
  }
);

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    add: (state, action: PayloadAction<CartProps>) => {
      state.cart.push(action.payload);
    },
    delete: (state, action: PayloadAction<string>) => {
      state.cart = state.cart.filter((cart) => cart.id !== action.payload);
    },
    increment: (state, action: PayloadAction<string>) => {
      state.cart = state.cart.map((cartItem) =>
        cartItem.id === action.payload
          ? {
              ...cartItem,
              quantity: cartItem.quantity + 1,
            }
          : cartItem
      );
    },
    decrement: (state, action: PayloadAction<string>) => {
      state.cart = state.cart.map((cartItem) =>
        cartItem.id === action.payload
          ? {
              ...cartItem,
              quantity: cartItem.quantity - 1,
            }
          : cartItem
      );
    },
  },
  extraReducers: (builder) => {
    builder.addCase(initCart.fulfilled, (state, action) => {
      state.cart = action.payload;
    });
  },
});

export const { actions, name } = cartSlice;
export default cartSlice.reducer;
