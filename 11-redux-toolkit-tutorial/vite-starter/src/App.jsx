import Navbar from "./components/Navbar";
import CartContainer from "./components/CartContainer";
import {useDispatch ,useSelector } from 'react-redux' ;
import { calculateTotals ,getCartItems } from "./features/cart/cartSlice";
import { useEffect } from "react";
import Modal from "./components/Modal";

function App() {
  const {cartItems,isLoading}  = useSelector((store)=>store.cart) ;  //useSelector to access the state from the store , cartItems and isLoading are fetched from the cart slice of the redux store 
  const {isOpen}  = useSelector((store)=>store.modal) ; 
  const dispatch   =useDispatch() ; 

  //useEffect runs every time there is a change to the cartItems
  useEffect(()=>{
    dispatch(calculateTotals())
  },[cartItems]) ;

  //useEffect , when application loads we will get the cart items 
  useEffect(()=>{
    dispatch(getCartItems())
  },[]) ;

  if(isLoading){
    return (
      <div className="loading">
             <h1>Loading...</h1>
      </div>
    )
  }
  return (
    <main>
      {/* if isOpen is true then  only show modal  */}
      {isOpen && <Modal/> }
     
    <Navbar/>
    <CartContainer/>
  </main>
  )
}
export default App;
