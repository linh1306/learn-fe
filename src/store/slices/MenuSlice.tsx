import { createSlice } from "@reduxjs/toolkit";

type IMenuState = {
  isOpenMenu: boolean;
};

const initialState: IMenuState = {
  isOpenMenu: false,
};

const MenuSlice = createSlice({
  name: "menu",
  initialState,
  reducers: {
    toggleMenu: (state) => {
      state.isOpenMenu = !state.isOpenMenu;
    },
  },
});

export const { toggleMenu } = MenuSlice.actions;

export default MenuSlice.reducer;
