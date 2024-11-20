import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
  HomeLayout,
  About,
  Landing,
  Error,
  Newsletter,
  Cocktail,
  SinglePageError,
} from "./pages";

import { loader as landingLoader } from "./pages/Landing"; //alias this as we will  be having many different loaders
import { loader as singleCocktailLoader } from "./pages/Cocktail";
import { action as newsletterAction } from "./pages/Newsletter";

const router = createBrowserRouter([
  {
    path: "/",
    //HomeLayout is the parent component
    element: <HomeLayout />,
    errorElement: <Error />, //this is the global error page
    children: [
      {
        index: true, //so this makes the Landing page the default one
        loader: landingLoader,
        errorElement: <SinglePageError />,
        element: <Landing />,
      },
      {
        path: "cocktail/:id", //for details page to  work where the path is /details/id we need to  set the route parameter here
        errorElement: <SinglePageError />,
        loader: singleCocktailLoader,
        element: <Cocktail />,
      },
      {
        path: "newsletter",
        element: <Newsletter />,
        action: newsletterAction,
      },
      {
        path: "about",
        element: <About />,
        children: [
          //so for the below ones we will have to  go to About and grab the outlet there
          {
            index: true,
            element: <h2>our company</h2>,
          },
          {
            path: "person",
            element: <h2>Jphn doe</h2>,
          },
        ],
      },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router}></RouterProvider>;
};
export default App;
