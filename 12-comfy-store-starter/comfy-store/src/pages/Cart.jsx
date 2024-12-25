import { useSelector } from 'react-redux';
import { CartItemsList, SectionTitle, CartTotals } from '../components';
import { Link } from 'react-router-dom'; //if the user has logged in we naviate to  checkout else we navigate to  the login page 

//will have the CartTotals and the CartItemsList
const Cart = () => {
  //temporary , will eventually get it from the user slice 
  const user = null ;
  
  const numItemsInCart  = useSelector((state)=>state.cartState.numItemsInCart) ;

  if(numItemsInCart=== 0){
    return  <SectionTitle text='Your cart is empty'/>
  }

//if there are items in your cart 
  return (
   <>
     <SectionTitle text='Shopping cart'/>
     <div className="mt-8 grid gap-8 lg:grid-cols-12">
       {/* below is  the cart items list div that spans 8 columns  and CartTotals spans only  4 columns */}
        <div className="lg:col-span-8">
         <CartItemsList/>
        </div>
        <div className="lg:col-span-4 lg:pl-4">
         <CartTotals/>
          {/* if the user exists we go to checkout else we go to the login page   */}
          {user ? (<Link to="/checkout" className="btn btn-primary btn-block mt-8">
          Proceed to  Checkout
          </Link>):(<Link to="/login" className="btn btn-primary btn-block mt-8" >Please login</Link>) }
        </div>
         
     </div>
   </>
  )
}
export default Cart