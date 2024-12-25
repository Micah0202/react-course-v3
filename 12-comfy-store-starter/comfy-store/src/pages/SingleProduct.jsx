import { useLoaderData } from 'react-router-dom';
import { formatPrice, customFetch, generateAmountOptions } from '../utils';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addItem } from '../features/cart/cartSlice';

//loader fetches all the data before rendering ie all the data from the api that will be displayed on the single product page 
//loader gets loader  parameter by default that has  the params property 
export const loader   = async({params}) =>{
  //console.log(loader);
 const response = await  customFetch(`/products/${params.id}`) ;//

 return  {product:response.data.data} ;

  //return null ;//return null  initially
}

const SingleProduct = () => {
  const {product}= useLoaderData() ;
   //console.log(product) ;//product.attributes is an object
  const {price, image , title , description  , colors  ,company  } = product.attributes ;
  //format the price
  const dollarsAmount  = formatPrice(price);

  //state  variable for the colors
  const [productColor ,  setProductColor ] = useState(colors[0]) ;//colors which is an array and always select the first item as default  

  //another state variable for the amount input 
  const [amount ,setAmount] = useState(1 );
  
  //function that we invoke everytime we change the vlue in the input 
  const handleAmount =(e)=>{
    //since it is coming from an input it is going to be text so we set it to number 
     setAmount(parseInt(e.target.value));//e.target.value is a string because <input>, <select>, and <textarea> use string values by default  for their value attribute 
  }
  
  //construct the big object that we will pass as payload to addItem 
 const cartProduct = {
  cartID  : product.id + productColor , //getting from  the colors array
  productID : product.id ,
  image, title , price ,  company ,productColor ,amount 
 }
  const dispatch = useDispatch() ; 
  
  //function that adds to cart 
  const addToCart =()=>{
     dispatch(addItem({product :cartProduct}))
  }


   return  (
    <section>
       <div className="text-md breadcrumbs">
           <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/products">Products</Link>
            </li>
           </ul>
       </div>
       {/*PRODUCT */}
       <div className='mt-6 grid gap-y-8 lg:grid-cols-2 lg:gap-x-16'>
           {/*IMAGE */}
           <img src={image}alt={title} className="w-96 h-96 object-cover rounded-lg lg:w-full " />
           {/*PRODUCT */}
           <div>
           <h1  className="capitalize text-3xl font-bold">
                 {title}
           </h1>
           <h4 className="text-xl text-neutral-content font-bold mt-2">{company}</h4>
           <p className="mt-3 text-xl">{dollarsAmount}</p>
           <p className="mt-6 leading-8">{description}</p>
            {/*COLORS */}
            <div className="mt-6">
            <h4 className="text-md font-medium tracking-wider capitalize">
               colors
            </h4>
            {/* iterate over the product colors below  */}
            <div className='mt-2'>
              {colors.map((color) => {
                return (
                  //style={{backgroundColor : color}} is used to  dynamically set thw background color of the button based on the value in the array .
                  <button
                    key={color}
                    type='button'
                    className={`badge  w-6 h-6 mr-2  ${
                      color === productColor && 'border-2 border-secondary'
                    }`}
                    style={{ backgroundColor: color }}  
                    onClick={() => setProductColor(color)}
                  ></button>
                );
              })}
            </div>
            </div>
           
           {/*AMOUNT WITH INPUT SELECTOR */}
           <div className="form-control w-full max-w-xs">
              <label  className="label" htmlFor="amount">
                <h4 className='text-md font-medium tracking-wider capitalize'>amount</h4>
              </label>
              <select className="select select-secondary select-bordered select-md" id="amount" value={amount} onChange={handleAmount}>
              {generateAmountOptions(20)}
              </select>
           </div>
           {/*CART BTN ie Add to bag button */}
            <div className="mt-10" >
           <button className="btn btn-secondary btn-md" onClick={()=>{
            console.log(addToCart());
            
           }}>
               Add to bag
           </button>
            </div>
           </div>
          
       </div>
    </section>
   )


}
export default SingleProduct