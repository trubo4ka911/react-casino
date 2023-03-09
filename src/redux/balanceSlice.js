import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: [],
  currentBalance: null,
  deposit: 0,
};

const balanceSlice = createSlice({
  name: "balance",
  initialState,
  reducers: {
    setDeposit: (state, action) => {
      const { deposit } = action.payload;
      state.deposit = deposit;
      state.currentBalance = deposit;
    },
    updateBalanceAmount: (state, action) => {
      state.currentBalance += action.payload;
    },
  },
});

export const { setDeposit, updateBalanceAmount } = balanceSlice.actions;
export default balanceSlice.reducer;
