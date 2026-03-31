import { configureStore } from '@reduxjs/toolkit'
import profileReducer from "./features/profile/profileSlice";
import userReducer from "./features/user/userSlice";

export const store = configureStore({
  reducer: {
    profile: profileReducer,
    user:userReducer
  },
});

export default store