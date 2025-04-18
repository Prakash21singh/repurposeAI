import { Action, createSlice, Dispatch, PayloadAction } from "@reduxjs/toolkit";

interface IUserStateTypes {
  id: string | null;
  name: string | null;
  email: string | null;
  subscription: {
    id: string;
    published: string | Date;
    type: "BASIC" | "PLATINUM" | "DAIMOND";
    subscriptionId: string | null;
  } | null;
  image: string | null;
  credit: {
    amount: number;
    id: string;
  } | null;
}

let initialState: IUserStateTypes = {
  id: null,
  email: null,
  image: null,
  name: null,
  subscription: null,
  credit: null,
};

const userSlice = createSlice({
  initialState,
  name: "user",
  reducers: {
    updateUser: (
      state: IUserStateTypes,
      action: PayloadAction<IUserStateTypes>
    ) => {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
});

export const { updateUser } = userSlice.actions;

export default userSlice.reducer;
