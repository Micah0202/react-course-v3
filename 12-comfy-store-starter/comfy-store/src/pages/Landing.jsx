import {FeaturedProducts, Hero} from "../components";
import {customFetch} from "../utils" ;

const url = "/products?featured=true";

export const loader = async()=>{
  const response =await customFetch(url);//basically customFetch.get
  const products = response.data.data ;
  return {products} ;//return an object with products inside
}


const Landing = () => {
  return (
    <>
      <Hero/>
      <FeaturedProducts/>
    </>
  )
}
export default Landing