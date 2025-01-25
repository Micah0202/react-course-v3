//Producst page with all the filters and pagination and tghe actual products
//this page will  have all the components related to  filters , product container and pagination

//Here we are  accessing  the query params
import { Filters, PaginationContainer, ProductsContainer } from "../components";
import { customFetch } from "../utils";

const url = "/products";

//todo - query ie allProductsQuery
const allProductsQuery = (queryParams) => {
  const { search, category, company, sort, price, shipping, page } =
    queryParams;

  return {
    queryKey: [
      "products",
      search ?? "",
      category ?? "all",
      company ?? "all",
      sort ?? "a-z",
      price ?? 100000,
      shipping ?? false,
      page ?? 1,
    ],
    queryFn: () =>
      customFetch(url, {
        params, //have to  pass the params as an object with key value pairs so  had to  use object.fromEntries
      }), //get the data and the metadata
  };
};

//todo -//only refactoring we do  for react  query is to make the loader a function that returns another function and accept the queryClient parameter

export const loader =
  (queryClient) =>
  async ({ request }) => {
    console.log(request); //{request : ....   , params: {} , context}

    /*
  Convert the query parameters into an array using [...searchParams.entries()].
Convert the array into an object using Object.fromEntries().
  */
    const params = Object.fromEntries([
      ...new URL(request.url).searchParams.entries(),
    ]); //getting the params object

    //console.log(params);

    //have custom fetch here
    const response = await queryClient.ensureQueryData(
      allProductsQuery(params)
    );
    const products = response.data.data;
    const meta = response.data.meta;
    return { products, meta, params }; //products is an array  , provide params as well so that on refreshing it does  not reset
  };

const Products = () => {
  return (
    <>
      <Filters />
      <ProductsContainer />
      <PaginationContainer />
    </>
  );
};
export default Products;
