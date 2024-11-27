import {configureStore} from "@reduxjs/toolkit" ; 
import cartReducer from './features/cart/cartSlice' ;
import modalReducer from './features/modal/modalSlice' 

//for the store we have a reducer and for the slice we have the reducers 
export const store = configureStore({
    reducer :{
       //inside we will have the slices of state 
       cart: cartReducer, //cartReducer is a function  allows is to control that piece of state ,
       modal : modalReducer
    },
})

