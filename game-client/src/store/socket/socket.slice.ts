import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface SocketState {
  lobby: string;
  sockets: string[];
}

const initialState = {
  lobby: "",
  sockets: [],
} as SocketState;

export const socketSlice = createSlice({
  name: "socket",
  initialState,
  reducers: {
    setLobby: (state, action: PayloadAction<string>) => {
      state.lobby = action.payload;
    },

    setSockets: (state, action: PayloadAction<string[]>) => {
      state.sockets = [...action.payload];
    },
  },
});

export const { setLobby, setSockets } = socketSlice.actions;

export default socketSlice.reducer;
