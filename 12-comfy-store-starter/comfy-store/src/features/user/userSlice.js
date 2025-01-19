import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const themes = {
  winter: "winter",
  dracula: "dracula",
};

const getUserFromLocalStorage = () => {
  return JSON.parse(localStorage.getItem("user")) || null;
};

//when the component mounts get the theme from the local storage
const getThemeFromLocalStorage = () => {
  const theme = localStorage.getItem("theme") || themes.winter; //if nothing in the local storage then get themes.winter
  document.documentElement.setAttribute("data-theme", theme); //setting the theme on the index.html attribute
  return theme;
};

//TODO  ->WE SET THE INITIAL  state below

const initialState = {
  user: getUserFromLocalStorage(), //initially we set coding addict but later it  will be dynamic
  theme: getThemeFromLocalStorage(),
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    //below  are the actions which are dispatched .
    loginUser: (state, action) => {
      console.log(action.payload); //getting the response.data in the payload

      //user inside the action.payload is an object with properties like blocked,confirmed, createdAt ,email , id , updatedAt  , username
      const user = { ...action.payload.user, token: action.payload.jwt };
      state.user = user;
      //store it in the local storage
      localStorage.setItem("user", JSON.stringify(user));
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
