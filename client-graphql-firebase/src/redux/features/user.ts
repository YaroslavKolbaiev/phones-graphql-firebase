import { createSlice } from '@reduxjs/toolkit';
import { User } from 'firebase/auth';
import { FirebaseAuthService } from '../../firebase/FirebaseAuthServer';
import store from '../store';
import { initFavorites } from './favorites';
import { initCart } from './cart';

const initialState: { userData: User | null } = {
  userData: null,
};

const userSlice = createSlice({
  name: 'userData',
  initialState,
  reducers: {
    set: (state, action) => {
      state.userData = action.payload;
    },
  },
});

FirebaseAuthService.subscribeToAuthChanges((dataFromFirebase) => {
  if (dataFromFirebase) {
    const { displayName, email, photoURL, uid } = dataFromFirebase;

    const user = {
      displayName,
      email,
      photoURL,
      uid,
    };

    store.dispatch(userSlice.actions.set(user));
    store.dispatch(initCart(uid));
    return store.dispatch(initFavorites(uid));
  }

  store.dispatch(userSlice.actions.set(null));
});

export default userSlice.reducer;
