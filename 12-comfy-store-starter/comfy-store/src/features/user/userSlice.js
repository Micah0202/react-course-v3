import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const themes = {
  winter: "winter",
  dracula: "dracula",
};
//when the component mounts get the theme from the local storage
const getThemeFromLocalStorage = () => {
  const theme = localStorage.getItem("theme") || themes.winter; //if nothing in the local storage then get themes.winter
  document.documentElement.setAttribute("data-theme", theme);
  return theme;
};

//set  the initial state

const initialState = {
  user: { username: "coding addict" }, //initially we set coding addict but later it  will be dynamic
  theme: getThemeFromLocalStorage(),
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    //below  are the actions which are dispatched .
    loginUser: (state, action) => {
      console.log("login");
    },
    //set the user as null for logout and then remove the user from local storage
    logoutUser: (state) => {
      state.user = null;
      localStorage.removeItem("user");
      toast.success("Logged out successfully");
    },
    toggleTheme: (state) => {
      const { dracula, winter } = themes;
      state.theme = state.theme === dracula ? winter : dracula;
      //add it to the html  element  as well
      document.documentElement.setAttribute("data-theme", state.theme);
      localStorage.setItem("theme", state.theme);
    },
  },
});

//first export const {all the actions}
export const { loginUser, logoutUser, toggleTheme } = userSlice.actions;

export default userSlice.reducer;
