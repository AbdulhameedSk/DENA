import { createSlice } from "@reduxjs/toolkit";
import { configureStore } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: {
      data: {},
    },
  },

  reducers: {
    registerUser: (state, action) => {
      state.user.data = action.payload;
    },
  },
});

export const { registerUser } = userSlice.actions;

export const store = configureStore({
  reducer: userSlice.reducer,
  //reducer: {}, for many diff types of reducers
});
export type AppDispatch = typeof store.dispatch;
