import { createSlice } from "@reduxjs/toolkit";

export const chatSlice = createSlice({
  name: "chat",
  initialState: {
    chatId: null,
    chatName: null,
    seed:""
  },
  reducers: {
    setChat: (state, action) => {
      state.chatId = action.payload.chatId;
      state.chatName = action.payload.chatName;
      state.seed = action.payload.seed;
    },
  },
});

export const { setChat } = chatSlice.actions;

export const selectChatName = (state) => state.chat.chatName;
export const selectSeed = (state) => state.chat.seed;
export const selectChatId = (state) => state.chat.chatId;

export default chatSlice.reducer;
