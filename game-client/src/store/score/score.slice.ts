import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface ScoreState {
  resultOut: boolean;
  winnerText: string;
  score: number;
  didWin: boolean;
}

const initialState = {
  resultOut: false,
  winnerText: "",
  score: 0,
  didWin: false,
} as ScoreState;

export const scoreSlice = createSlice({
  name: "score",
  initialState,
  reducers: {
    increment: (state) => {
      state.score += 1;
    },

    setResultOut: (state, action: PayloadAction<boolean>) => {
      state.resultOut = action.payload;
    },

    setWinnerText: (state, action: PayloadAction<string>) => {
      state.winnerText = action.payload;
    },

    setScore: (state, action: PayloadAction<number>) => {
      state.score = action.payload;
    },

    setDidWin: (state, action: PayloadAction<boolean>) => {
      state.didWin = action.payload;
    },
  },
});

export const { increment, setResultOut, setWinnerText, setScore, setDidWin } =
  scoreSlice.actions;

export default scoreSlice.reducer;
