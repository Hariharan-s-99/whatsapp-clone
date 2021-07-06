import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/userSlice";
import chatReducer from "../features/ChatSlice";
import ToggleSlice from "../features/ToggleSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    chat: chatReducer,
    toggle: ToggleSlice,
  },
});
