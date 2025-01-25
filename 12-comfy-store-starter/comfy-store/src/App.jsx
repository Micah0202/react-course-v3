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
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { ErrorElement } from "./components";
import { store } from "./store";
//LOADERS
import { loader as landingLoader } from "./pages/Landing";
import { loader as singleProductLoader } from "./pages/SingleProduct";
import { loader as productsLoader } from "./pages/Products";
import { loader as checkoutLoader } from "./pages/Checkout";
import { loader as ordersLoader } from "./pages/Orders";

//ACTIONS
import { action as registerAction } from "./pages/Register";
import { action as loginAction } from "./pages/Login";
import { action as checkoutAction } from "./components/CheckoutForm";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      //below we are setting the global  stale time
      staleTime: 1000 * 60 * 5, //stale time is a configuration option that determines how long the cached data is considered "fresh" before it becomes "stale
    },
  },
});
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
        loader: landingLoader(queryClient), //loader runs before the component is rendered and fetches all the necessary data for that component , if there  is an error then  ErrorElement is triggered
      },
      {
        path: "products",
        element: <Products />,
        errorElement: <ErrorElement />,
        loader: productsLoader(queryClient),
      },
      {
        path: "products/:id",
        element: <SingleProduct />,
        errorElement: <ErrorElement />,
        loader: singleProductLoader(queryClient),
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
        loader: checkoutLoader(store), //pass the store the same way we did for login action,
        action: checkoutAction(store, queryClient),
      },
      {
        path: "orders",
        element: <Orders />,
        loader: ordersLoader(store, queryClient),
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
const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default App;
