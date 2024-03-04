import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user/user.slice";

import socketSlice from "./socket/socket.slice";
import opponentStatusSlice from "./opponentStatus/opponentStatus.slice";
import scoreSlice from "./score/score.slice";
import playerSlice from "./player/player.slice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    score: scoreSlice,
    player: playerSlice,
    socket: socketSlice,
    opponentStatus: opponentStatusSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
