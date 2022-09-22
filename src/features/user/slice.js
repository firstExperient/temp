import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLogged: false,
  data: {
    name: "",
    members: [],
    phones:[]
  },
};

const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    setUser: (state, { payload }) => {
      state.data = payload;
      state.isLogged = true;
    },
    logOut: (state) => {
      state.isLogged = false;
      state.data = {
        name: "",
        members: [],
        phones:[]
      };
    },
  },
});

export const { setUser, logOut } = userSlice.actions;

export default userSlice.reducer;
