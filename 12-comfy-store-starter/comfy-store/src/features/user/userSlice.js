import { createSlice } from "@reduxjs/toolkit"
import { toast } from "react-toastify"

const themes = {
    winter : 'winter',
    dracula : 'dracula',
}
//when the component mounts get the theme from the local storage 
const getThemeFromLocalStorage =()=>{
    return localStorage.getItem('theme') || themes.winter ;  //if nothing in the local storage then get themes.winter 
}


//set  the initial state

const initialState = {
    user:{username: 'coding addict'} ,//initially we set coding addict but later it  will be dynamic
    theme : getThemeFromLocalStorage() ,

}

const userSlice =({

    name:'user',
    initialState,
    reducers  : {
        loginUser : (state,action)=>{
            console.log('login')
        },
        logoutUser : (state)=>{
            console.log('logout')
        },
        toggleTheme :(state) =>{
         console.log('toggle theme');
        } ,
    }

});

export const {loginUser ,  logoutUser , toggleTheme } = userSlice.actions ;
export default userSlice.reducer  ;