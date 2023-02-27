import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  balance: null,
};

const balanceSlice = createSlice({
  name: "balance",
  initialState,
  reducers: {
    setBalance: (state, action) => {
      state.balance = action.payload;
    },
    updateBalance: (state, action) => {
      state.balance += action.payload;
    },
  },
});

export const { setBalance, updateBalance } = balanceSlice.actions;

export default balanceSlice.reducer;
