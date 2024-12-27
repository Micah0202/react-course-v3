import {
  About,
  Cart,
  Checkout,
  Error,
  HomeLayout,
  Landing,
  Orders,
  Products,
  Register,
  SingleProduct,
  Login,
} from "./pages";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { ErrorElement } from "./components";
import { store } from "./store";
//LOADERS
import { loader as landingLoader } from "./pages/Landing";
import { loader as singleProductLoader } from "./pages/SingleProduct";
import { loader as productsLoader } from "./pages/Products";
//ACTIONS
import { action as registerAction } from "./pages/Register";
import { action as loginAction } from "./pages/Login";

//import the store and pass it to  the login page

//set all the paths inside , parent and the children routes
//in the children if there is some error it will bubble up to the parent
// rest of the pages which need the navbar and header will be the children
const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />, //whatever is in the HomeLayout is shared in all the children
    errorElement: <Error />,
    children: [
      {
        //Landing is the default page
        index: true,
        element: <Landing />,
        errorElement: <ErrorElement />,
        //below loader   fetches the featured products for the landing page
        loader: landingLoader, //loader runs before the component is rendered and fetches all the necessary data for that component , if there  is an error then  ErrorElement is triggered
      },
      {
        path: "products",
        element: <Products />,
        errorElement: <ErrorElement />,
        loader: productsLoader,
      },
      {
        path: "products/:id",
        element: <SingleProduct />,
        errorElement: <ErrorElement />,
        loader: singleProductLoader,
      },
      {
        path: "cart",
        element: <Cart />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "checkout",
        element: <Checkout />,
      },
      {
        path: "orders",
        element: <Orders />,
      },
    ],
  },
  //the below paths dont want HomeLayout as the parent as they dont need the navbar and the header
  {
    path: "/login",
    element: <Login />,
    errorElement: <Error />,
    //passing the store dynamically like below follows the dependency injection  principle making the function  modular and testable
    action: loginAction(store),
  },
  {
    path: "/register",
    element: <Register />,
    errorElement: <Error />,
    action: registerAction,
  },
]);
function App() {
  return <RouterProvider router={router} />;
}

export default App;
