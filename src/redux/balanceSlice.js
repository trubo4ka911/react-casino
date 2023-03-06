import { createSlice } from "@reduxjs/toolkit";

const initialState = { users: [], currentBalance: null };

const balanceSlice = createSlice({
  name: "balance",
  initialState,
  reducers: {
    setBalance: (state, action) => {
      const { name, balance } = action.payload;
      state.currentBalance = balance;
    },
    updateBalance: (state, action) => {
      state.currentBalance += action.payload;
    },
  },
});

export const { setBalance, updateBalance } = balanceSlice.actions;
export default balanceSlice.reducer;
