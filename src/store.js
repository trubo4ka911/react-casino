import { createStore, combineReducers } from "redux";
import balanceReducer from "./redux/balanceSlice";
import gameHistoryReducer from "./redux/gameHistorySlice";

const rootReducer = combineReducers({
  balance: balanceReducer,
  gameHistory: gameHistoryReducer,
});

const store = createStore(rootReducer);

export default store;
