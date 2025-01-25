//this is the Orders page which  will have various components like OrdersList etc
import { redirect, useLoaderData } from "react-router-dom";
import { toast } from "react-toastify";
import { customFetch } from "../utils";
import {
  OrdersList,
  ComplexPaginationContainer,
  SectionTitle,
} from "../components";

//todo - query
const ordersQuery = (params, user) => {
  return {
    queryKey: [
      "orders",
      user.username,
      params.page ? parseInt(params.page) : 1,
    ],
    queryFn: () =>
      customFetch.get("/orders", {
        params,
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }),
  };
};

//add the query params for example the pages
//the loader  gets all the data before the page loads so  get all the  data from the server about the orders and displays it
export const loader =
  (store, queryClient) =>
  async ({ request }) => {
    // console.log(store);
    // first restrict the user by checking if a user is logged in
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
    //query param only to get the page
    const params = Object.fromEntries([
      ...new URL(request.url).searchParams.entries(),
    ]);
    console.log(params);
    try {
      const response = await queryClient.ensureQueryData(
        ordersQuery(params, user)
      );
      // console.log(response);
      //return the orders and the meta
      return { orders: response.data.data, meta: response.data.meta };
    } catch (error) {
      console.log(error);

      const errorMessage =
        error?.response?.data?.error?.message ||
        "please double check your credentials";
      toast.error(errorMessage);
      //403 if token is invalid
      if (error?.response?.status === 401 || 403) {
        return redirect("/login");
      }

      return null;
    }
  };

const Orders = () => {
  const { meta } = useLoaderData();
  if (meta.pagination.total < 1) {
    return <SectionTitle text="please make an  order" />;
  }
  return (
    <>
      <SectionTitle text="your orders" />
      <OrdersList />
      <ComplexPaginationContainer />
    </>
  );
};
export default Orders;
