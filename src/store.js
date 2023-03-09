import { configureStore } from "@reduxjs/toolkit";
import balanceReducer from "./redux/balanceSlice";
import gameHistoryReducer from "./redux/gameHistorySlice";

const store = configureStore({
  reducer: {
    balance: balanceReducer,
    gameHistory: gameHistoryReducer,
  },
});

export default store;
