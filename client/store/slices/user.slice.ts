import { Action, createSlice, Dispatch, PayloadAction } from "@reduxjs/toolkit";

interface IUserStateTypes {
  id: string | null;
  name: string | null;
  email: string | null;
  subscription: "BASIC" | "PLATINUM" | "DAIMOND";
  image: string | null;
}

let initialState: IUserStateTypes = {
  id: null,
  email: null,
  image: null,
  name: null,
  subscription: "BASIC",
};

const userSlice = createSlice({
  initialState,
  name: "user",
  reducers: {
    updateUser: (
      state: IUserStateTypes,
      action: PayloadAction<IUserStateTypes>
    ) => {
      state = {
        ...state,
        ...action.payload,
      };
    },
  },
});

export const { updateUser } = userSlice.actions;

export default userSlice.reducer;
