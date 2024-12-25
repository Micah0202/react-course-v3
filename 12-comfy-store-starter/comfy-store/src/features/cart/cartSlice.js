import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

//defaultState is the initial  state  of the cart 
const defaultState = {
  cartItems: [],
  numItemsInCart: 0,
  cartTotal: 0, //number of cart  items multipled by specific price 
  shipping: 500,
  tax: 0,
  orderTotal: 0, //cumulation of everything 
};

//grab the items from the local  storage and  set them as the initial state , below is the function that does that
const getCartFromLocalStorage  = () =>{
 //have to use JSON.parse  as it is stored as an object 
 return JSON.parse(localStorage.getItem('cart')) || defaultState ; //if there is no  state in the local storage then we set the default  state
}

const  cartSlice = createSlice({
    name : 'cart' , 
    initialState  : getCartFromLocalStorage() , //this one line the initial state is fetched from the local storage 
    reducers : {
        //adds item to  the cart 
        //we are getting an entire product object as payload 
        //action is the product in the case of addItem
        addItem : (state,  action )=>{
          const {product}  = action.payload; 
            //find the item in the cart and if the cart id matches to any of the items in the cart  then increase the count 
            const item = state.cartItems.find((i)=> i.cartID === product.cartID) ;
            //item variable will  either be empty or have something 
            //if it has something then increase the count 
            if(item)
            {
                item.amount += product.amount ;//add current amount to what is  already there in  the cart 
            }
            else{
                //Immer in redux allows us t o directly mutate the state 
                //if there are no items in the cart 
                state.cartItems.push(product);
            }
           
            //updating the other state variables 
            state.numItemsInCart += product.amount ;
            state.cartTotal  += product.price * product.amount  ;
            
            //since we are not dispatching it from the component we need to pass the state as well .
           cartSlice.caseReducers.calculateTotals(state) ; 

            toast.success('Item added to cart') ;


        },
        clearCart :(state)=>{
               localStorage.setItem('cart',JSON.stringify(state))   ;//set it to the default state
               return defaultState ;//also clear the local storage 
        },
        removeItem : (state , action)=>{
           const {cartID} = action.payload ; 

           //find the item in the cart
           const product = state.cartItems.find((i)=>i.cartID===cartID);
           
           //ACTUALLY removing the item using filter
           state.cartItems = state.cartItems.filter((i)=> i.cartID !== cartID) ; //return  the items where the cartID is not matching this filtering the item out 

            //updating the other state variables 
            state.numItemsInCart -= product.amount ;
            state.cartTotal  -= product.price * product.amount  ;
           
            //taking care of  the tax shipping etc using caseReducer 
            cartSlice.caseReducers.calculateTotals(state);
            toast.success('Item removed from  cart');

            
        
        },
        //need the action  inside that the payload to edit the particular item 
        editItem :(state ,action)=>{
          const {cartID ,amount}  = action.payload ;
           const item = state.cartItems.find((i)=>i.cartID ===cartID);
           state.numItemsInCart += amount - item.amount ; 
           state.cartTotal += item.price * (amount - item.amount) ;
           item.amount = amount ;
           cartSlice.caseReducers.calculateTotals(state);
           toast.success('Cart updated')
        },
        //another reducer that will  just do  the work of calculating total tax and order total . And also saves the cart in the local storage
        calculateTotals : (state)=>{
            //we will re use the below lines in removeItem and editItem
            state.tax = 0.1 + state.cartTotal  ; 
            state.orderTotal  =state.cartTotal + state.shipping  + state.tax ; 
           
            //updating the local storage so  that when  we refresh  the item persists  in the cart 
            localStorage.setItem('cart' ,JSON.stringify(state)) ;
        }
    },
});

export const {addItem , clearCart ,removeItem ,editItem } = cartSlice.actions ; //here the name must be used  as is inside the cartSlice.actions object
export default cartSlice.reducer ; //export default is used to export a single value or entity from a module.And only one default export is  allowed per file 