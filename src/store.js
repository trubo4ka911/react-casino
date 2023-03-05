import { createStore, combineReducers } from "redux";
import balanceReducer from "./redux/balanceSlice";
import gameHistoryReducer from "./redux/gameHistorySlice";
import userReducer from "./redux/userSlice";

const rootReducer = combineReducers({
  balance: balanceReducer,
  gameHistory: gameHistoryReducer,
  user: userReducer,
});

const store = createStore(rootReducer);

export default store;
