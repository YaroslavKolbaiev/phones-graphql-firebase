import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type EndOfDataState = {
  endOfData: boolean;
};

const initialState: EndOfDataState = {
  endOfData: false,
};

const endOfDataSlice = createSlice({
  name: 'endOfData',
  initialState,
  reducers: {
    set: (state, action: PayloadAction<boolean>) => {
      state.endOfData = action.payload;
    },
  },
});

export const { actions } = endOfDataSlice;
export default endOfDataSlice.reducer;
