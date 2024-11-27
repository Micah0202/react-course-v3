import { createSlice } from "@reduxjs/toolkit";

const initialState ={
    isOpen: false ,
}

//createSlice automatically 
const modalSlice = createSlice({
    name: 'modal', 
    initialState ,
    reducers :{
        //each function below is an action that can be dispatched 
        openModal : (state , action)=>{
            state.isOpen = true ;
        } ,
        
        closeModal : (state , action)=>{
            state.isOpen = false ;
        }

    },
});
export  const {openModal , closeModal} = modalSlice.actions ;

export default modalSlice.reducer ;// this reducer is registered in the store under a specific key called modal 