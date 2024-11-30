import { About ,Cart , Checkout ,Error , HomeLayout , Landing , Orders , Products, Register ,SingleProduct,Login} from "./pages" 
import {RouterProvider ,createBrowserRouter} from 'react-router-dom' ;

//set all the paths inside , parent and the children routes 
//in the children if there is some error it will bubble up to the parent 
// rest of the pages which need the navbar and header will be the children
const router = createBrowserRouter ([
  {
    path : '/' ,
    element : <HomeLayout/>, //whatever is in the HomeLayout is shared in all the children 
    errorElement : <Error/> ,
    children :[
     {//Landing is the default page 
      index:true , 
      element:<Landing/>,
      },
      {
        path : 'products',
        element:<Products/>,
      },
      {
        path : 'products/:id',
        element:<SingleProduct/>,
      },
      {
        path : 'cart',
        element:<Cart/>,
      },
      {
        path : 'about',
        element:<About/>,
      },
      {
        path : 'checkout',
        element:<Checkout/>,
      },
      {
        path : 'orders',
        element:<Orders/>,
      },
  
     
    ]
   },
   //the below paths dont want HomeLayout as the parent as they dont need the navbar and the header
   {
    path : '/login' ,
    element : <Login/>,
    errorElement : <Error/>
   },
   {
    path : '/register' ,
    element : <Register/>,
    errorElement : <Error/>
   }
])
function App() {
  
  return (
     <RouterProvider router={router}/>
  )
}

export default App
