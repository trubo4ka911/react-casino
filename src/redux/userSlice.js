import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  users: [],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload;
    },
    addUser: (state, action) => {
      state.users.push(action.payload);
    },
  },
});

export const { setCurrentUser, addUser } = userSlice.actions;

export default userSlice.reducer;
