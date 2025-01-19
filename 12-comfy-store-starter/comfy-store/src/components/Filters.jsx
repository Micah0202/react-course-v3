//impor tForm , useloaderDtaa , Link , FormInput
import { Form, useLoaderData, Link } from "react-router-dom";
import FormInput from "./FormInput";
import FormSelect from "./FormSelect";
import FormRange from "./FormRange";
import FormCheckbox from "./FormCheckbox";

const Filters = () => {
  //to  get meta use loader ,Products.jsx has the loader
  const { meta, params } = useLoaderData(); //using the same loader meant for Products
  const { search, company, category, order, price, shipping } = params; //query params that we get from  the url , we need them here to set as the default value so  that when the page is refreshed there is no problem
  return (
    //form by default is get as it is getting products from the api
    <Form className="bg-base-200 rounded-md px-8 py-4 grid gap-x-4 gap-y-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 items-center">
      {/*SEARCH name has to  match what is in the backend ie what the server is looking for  ,set the defaultValue as what you are getting from the loader so that  on refreshing the filters are not reset */}
      <FormInput
        type="search"
        label="search product"
        name="search"
        size="input-sm"
        defaultValue={search}
      />

      {/* SELECT CATEGORIES DROPDOWN*/}
      <FormSelect
        label="select category"
        name="category"
        size="select-sm"
        list={meta.categories}
        defaultValue={category}
      />

      {/* SELECT COMPANIES DROPDOWN , name is what server is looking for , size='select-sm'  sets the size of the select drop down box */}
      <FormSelect
        label="select company"
        name="company"
        size="select-sm"
        list={meta.companies}
        defaultValue={company}
      />

      {/* ORDER SORT A-Z ,Z-A ,HIGH ,LOW*/}
      <FormSelect
        label="sort by"
        name="order"
        size="select-sm"
        list={["a-z", "z-a", "high", "low"]}
        defaultValue={order}
      />

      {/*PRICE RANGE  SLIDER */}
      <FormRange
        name="price"
        label="select price"
        size="range-sm"
        price={price}
      />

      {/*Shipping checked button  */}
      <FormCheckbox
        name="shipping"
        label="free shipping"
        size="checkbox-sm"
        defaultValue={shipping}
      />

      {/*BUTTONS */}
      <button type="submit" className="btn btn-primary btn-sm">
        Search
      </button>
      {/* reset button will be a link and on clicking goes back  to the same Products page */}
      <Link to="/products" className="btn btn-accent btn-sm">
        Reset
      </Link>
    </Form>
  );
};
export default Filters;
