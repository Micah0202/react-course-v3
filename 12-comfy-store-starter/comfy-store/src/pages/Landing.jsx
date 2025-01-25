import { FeaturedProducts, Hero } from "../components";
import { customFetch } from "../utils";

const url = "/products?featured=true";

//only refactoring we do  for react  query is to make the loader a function that returns another function and accept the queryClient parameter 
export const loader = (queryClient) => async () => {
  const response = await customFetch(url); //basically customFetch.get
  const products = response.data.data;
  return { products }; //return an object with products inside
};

const Landing = () => {
  return (
    <>
      <Hero />
      <FeaturedProducts />
    </>
  );
};
export default Landing;
