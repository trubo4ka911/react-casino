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
  },
});

export const { addGameToHistory, clearHistory } = gameHistorySlice.actions;

export default gameHistorySlice.reducer;
