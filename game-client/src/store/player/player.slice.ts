import { createSlice } from "@reduxjs/toolkit";

import type { PayloadAction } from "@reduxjs/toolkit";

export interface IGuest {
  id: string;
  firstName: string;
  status: number | null;
}

export interface PlayerState {
  isPlaying: boolean;
  playerOneActive: boolean;
  playerChoice: string;
  gamePlay: boolean;
  opponentChoice: string;
  guestInfo: IGuest;
}

const initialState = {
  isPlaying: false,
  playerOneActive: false,
  playerChoice: "",
  gamePlay: false,
  opponentChoice: "",
  guestInfo: {
    id: "",
    firstName: "",
    status: null,
  },
} as PlayerState;

export const playerSlice = createSlice({
  name: "player",
  initialState,
  reducers: {
    setIsPlaying: (state, action: PayloadAction<boolean>) => {
      state.isPlaying = action.payload;
    },

    setPlayerOneActive: (state, action: PayloadAction<boolean>) => {
      state.playerOneActive = action.payload;
    },

    setPlayerChoice: (state, action: PayloadAction<string>) => {
      state.playerChoice = action.payload;
    },

    setGamePlay: (state, action: PayloadAction<boolean>) => {
      state.gamePlay = action.payload;
    },

    setOpponentChoice: (state, action: PayloadAction<string>) => {
      state.opponentChoice = action.payload;
    },

    setGuestInfo: (state, action: PayloadAction<IGuest>) => {
      state.guestInfo = action.payload;
    },
  },
});

export const {
  setIsPlaying,
  setPlayerOneActive,
  setPlayerChoice,
  setGamePlay,
  setOpponentChoice,
  setGuestInfo,
} = playerSlice.actions;

export default playerSlice.reducer;
