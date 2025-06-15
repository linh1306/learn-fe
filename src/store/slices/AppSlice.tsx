import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PublicUsersDto, ResChatWithGeminiDto } from "@/model";

interface Message {
  id: string;
  user?: {
    content: string;
  };
  assistant?: ResChatWithGeminiDto;
}

type IAppState = {
  user?: PublicUsersDto;
  theme: "light" | "dark";
  messages: Message[];
};

const initialState: IAppState = {
  user: undefined,
  theme: "light",
  messages: [],
};

const AppSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<PublicUsersDto>) {
      state.user = action.payload;
    },
    clearUser(state) {
      state.user = undefined;
    },
    toggleTheme(state) {
      state.theme = state.theme === "light" ? "dark" : "light";
    },
    addMessages(state, action: PayloadAction<Message>) {
      state.messages.push(action.payload);
      if (state.messages.length > 5) {
        state.messages = state.messages.slice(-5);
      }
    },
  },
});

export const { setUser, clearUser, toggleTheme, addMessages } =
  AppSlice.actions;

export default AppSlice.reducer;
