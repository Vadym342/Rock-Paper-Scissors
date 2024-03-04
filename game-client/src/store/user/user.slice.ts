import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { UserResponseDataType } from "../../types/user.types";

export interface UserStateType {
  user: UserResponseDataType | null;
  isAuth: boolean;
}

const initialState = {
  user: null,
  isAuth: false,
} as UserStateType;

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<UserResponseDataType>) => {
      state.user = action.payload;
      state.isAuth = true;
    },

    logOut: (state) => {
      state.isAuth = false;
      state.user = null;
    },
  },
});

export const { login, logOut } = userSlice.actions;

export default userSlice.reducer;
