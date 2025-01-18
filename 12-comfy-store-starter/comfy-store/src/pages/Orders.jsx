//this is the Orders page which  will have various components like OrdersList etc
import { redirect, useLoaderData } from "react-router-dom";
import { toast } from "react-toastify";
import { customFetch } from "../utils";
import { OrdersList, PaginationContainer, SectionTitle } from "../components";

//add the query params for example the pages
//the loader  gets all the data before the page loads so  get all the  data from the server about the orders and displays it
export const loader =
  (store) =>
  async ({ request }) => {
    // console.log(store);
    const user = store.getState().userState.user;

    if (!user) {
      toast.warn("you must be logged in to view orders");
      return redirect("/login");
    }
    //todo- grabbing all the params from the URL  in the browser
    //React router provides the full url in request.url
    //searchParams passes through the URL and provides access to  query parameters
    //convert this array  into an object using Object.fromEntries()
    //params is an object so easier to  send to API
    const params = Object.fromEntries([
      ...new URL(request.url).searchParams.entries(),
    ]);
    try {
      const response = await customFetch.get("/orders", {
        params,
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
    } catch (error) {}
    return null;
  };

const Orders = () => {
  return <div>Orders</div>;
};
export default Orders;
