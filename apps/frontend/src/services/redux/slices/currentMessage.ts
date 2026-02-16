// redux/slices/msgSlice.ts

import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

/* ================== TYPES ================== */

export interface User {
  id: string;
  email: string;
  name: string;
}

export interface Message {
  id: string;
  content: string;
  senderId: string;
  createdAt: string;
}

export interface Conversation {
  id: string;
  createdAt: string;
  user1Id: string;
  user2Id: string;
  user1: User;
  user2: User;
  messages: Message[];
}

/* ================== STATE ================== */

interface MsgState {
  currentConversation: Conversation | null;
  loading: boolean;
}

const initialState: MsgState = {
  currentConversation: null,
  loading: false,
};

/* ================== SLICE ================== */

const msgSlice = createSlice({
  name: "msg",
  initialState,
  reducers: {
    startLoading(state) {
      state.loading = true;
    },

    setCurrentMsg(state, action: PayloadAction<Conversation>) {
      state.currentConversation = action.payload;
      state.loading = false;
    },

    clearCurrentMsg(state) {
      state.currentConversation = null;
      state.loading = false;
    },

    addMessage(state, action: PayloadAction<Message>) {
      if (state.currentConversation) {
        state.currentConversation.messages.push(action.payload);
      }
    },
  },
});

export const {
  startLoading,
  setCurrentMsg,
  clearCurrentMsg,
  addMessage,
} = msgSlice.actions;

export default msgSlice.reducer;
