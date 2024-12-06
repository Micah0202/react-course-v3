//Producst page with all the filters and pagination and tghe actual products 
//this page will  have all the components related to  filters , product container and pagination
import { Filters, PaginationContainer, ProductsContainer } from "../components";
import { customFetch } from '../utils';

const url = '/products' ;
export const loader = async({request})=>{
  console.log(loader); //{request : ....   , params: {} , context}
  //have custom fetch here 
  const response=await customFetch(url); //get the data and the metadata 
  const products  =response.data.data ;
  const meta= response.data.meta ;
  return {products , meta } ;//products is an array 

}


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