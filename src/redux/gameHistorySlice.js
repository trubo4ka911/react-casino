import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  history: [],
};

const gameHistorySlice = createSlice({
  name: "gameHistory",
  initialState,
  reducers: {
    addGameToHistory: (state, action) => {
      state.history.push(action.payload);
    },
    clearHistory: (state) => {
      state.history = [];
    },
    updateBalance: (state, action) => {
      state.balance = action.payload;
    },
    resetHistory: (state) => {
      state.history = [];
    },
  },
});

export const { addGameToHistory, clearHistory, updateBalance, resetHistory } =
  gameHistorySlice.actions;

export default gameHistorySlice.reducer;
