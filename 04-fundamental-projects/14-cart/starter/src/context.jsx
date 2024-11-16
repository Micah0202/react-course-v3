import { useContext, useReducer, useEffect, createContext } from "react";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  //set up the useReducer,looks for reduicer function that  returns the new updated state and the initial  value
  const [] = useReducer();

  return (
    <AppContext.Provider value={{ greeting }}>{children}</AppContext.Provider>
  );
};

//custom hook

export const useGlobalContext = () => {
  return useContext(AppContext);
};
