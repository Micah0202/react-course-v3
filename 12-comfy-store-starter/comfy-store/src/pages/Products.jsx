//Producst page with all the filters and pagination and tghe actual products 
//this page will  have all the components related to  filters , product container and pagination

//Here we are  accessing  the query params 
import { Filters, PaginationContainer, ProductsContainer } from "../components";
import { customFetch } from '../utils';

const url = '/products' ;
export const loader = async({request})=>{
  console.log(request); //{request : ....   , params: {} , context}

  /*
  Convert the query parameters into an array using [...searchParams.entries()].
Convert the array into an object using Object.fromEntries().
  */
 const params = Object.fromEntries([...new URL(request.url).searchParams.entries()]) ; //getting the params object
  

//  console.log(params);


  //have custom fetch here 
  const response=await customFetch(url ,{
    params
  }); //get the data and the metadata 
  const products  =response.data.data ;
  const meta= response.data.meta ;
  return {products , meta ,params } ;//products is an array  , provide params as well so that on refreshing it does  not reset 

};



const Products = () => {
  return (
    <>
     <Filters/>
     <ProductsContainer/>
     <PaginationContainer/>
    </>
  )
}
export default Products