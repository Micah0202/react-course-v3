//impor tForm , useloaderDtaa , Link , FormInput
import { Form, useLoaderData, Link } from 'react-router-dom';
import FormInput from './FormInput';
import FormSelect from './FormSelect';



const Filters = () => {

   //to  get meta use loader ,Products.jsx has the loader 
   const {meta}  = useLoaderData() ;
  return (
   
    //form by default is get
  <Form className="bg-base-200 rounded-md px-8 py-4 grid gap-x-4 gap-y-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 items-center"> 
    
     {/*SEARCH name has to  match what is in the backend ie what the server is looking for */}
     <FormInput type="search" label="search product" name="search" size="input-sm" />
     
     {/* SELECT CATEGORIES DROPDOWN*/}
     <FormSelect label="select category" name="category" size='select-sm' list={meta.categories} />


     {/* SELECT COMPANIES DROPDOWN , name is what server is looking for , size='select-sm'  sets the size of the select drop down box */}
     <FormSelect label="select company" name="company" size='select-sm' list={meta.companies} />


     {/* ORDER SORT A-Z ,Z-A ,HIGH ,LOW*/}
     <FormSelect label="sort by" name="order" size='select-sm' list={['a-z','z-a','high','low']} />
    
     {/*BUTTONS */}
    <button type="submit" className="btn btn-primary btn-sm">
      Search
    </button>
    {/* reset button will be a link */}
      <Link to="/products" className="btn btn-accent btn-sm">
            Reset
      </Link>
  </Form>
  )
}
export default Filters