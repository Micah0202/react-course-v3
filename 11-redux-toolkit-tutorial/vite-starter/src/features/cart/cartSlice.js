import { createSlice  ,createAsyncThunk} from "@reduxjs/toolkit"; 
import cartItems from "../../cartItems";


const  url  =  "https://course-api.com/react-useReducer-cart-project" ;

//below  are all the state variables 
const initialState = {
    cartItems : [],
    amount : 4 , //the number of total items in the cart 
     total : 0  , //total amount ie the number on the cart  icon
     isLoading : true ,

};

//NEW CODE -createAsyncThunk takes an action and a callback that shud return  a promise 
export const getCartItems = createAsyncThunk('cart/getCartItems' , async()=>{
  return fetch(url).then(resp=>resp.json()).catch((err)=> console.log(err))
})

//redux automatically creates  reducer function  for this slice 
const cartSlice = createSlice({
    name:'cart' , 
    initialState ,

    reducers :{
      //set up the reducer that will clear  the cart
      //clearCart is inside actions in the slice and can be used to mutate the state 
      clearCart : (state) =>{
       state.cartItems = []; // we can mutate the state directly unlike useReducer
      },
      removeItem :(state , action )=>{
        const itemId = action.payload ;
        //if the id matches then  then that item wont be returned 
        state.cartItems = state.cartItems.filter((item)=>item.id !== itemId)
      } ,
      increase : (state ,{payload} )=>{
       //whatever we pass in the reducer function 
        const cartItem = state.cartItems.find((item)=>item.id === payload.id ) ;
         cartItem.amount = cartItem.amount + 1  ;
      },
      decrease : (state ,{payload} )=>{
       // const itemId = action.payload ; //whatever we pass in the reducer function 
        const cartItem = state.cartItems.find((item)=>item.id === payload.id ) ;
         cartItem.amount = cartItem.amount - 1  ;//this amount is the specific item amount and not the total items in the cart 
      },
      //this is to sync up the individual items total and the number on the cart icon
      calculateTotals : (state) =>{
        let amount = 0 ; 
         let total = 0 ;
         state.cartItems.forEach((item)=>{
             amount += item.amount ,
             total += item.amount *  item.price  
         })
         state.amount = amount ; 
         state.total = total ;

      }
    },
    //USING THE BUILDER CALLBACK  NOTATION 
    extraReducers :(builder)=>{
       builder.addCase(getCartItems.pending , (state)=>{
        state.isLoading = true  ; 
       }).addCase(getCartItems.fulfilled ,  (state,action)=>{
       state.isLoading=false; 
         state.cartItems = action.payload ; 
       }).addCase(getCartItems.rejected , (state)=>{
           state.isLoading =false ; 
       })
    }
 //FOR ASYNC OPERATION  , they handle the lifecycle actions 
    // extraReducers :{
    //   //for each action we get the  lifecycle actions 
    //   [getCartItems.pending]:(state)=>{
    //     state.isLoading =true
    //   },
    //   [getCartItems.fulfilled]:(state,action)=>{
    //     console.log(action );
    //     state.isLoading =false ; 
    //     state.cartItems= action.payload ; //action.payload has the successful json response 
    //   },
    //   [getCartItems.rejected]:(state)=>{
    //     state.isLoading =false
    //   }
    // }
})
//console.log(cartSlice);// the reducer function inside the slice is going to control the state
export const {clearCart ,removeItem ,increase ,decrease ,calculateTotals} = cartSlice.actions ; 
export default cartSlice.reducer ; //export the reducer function that changes the state 
