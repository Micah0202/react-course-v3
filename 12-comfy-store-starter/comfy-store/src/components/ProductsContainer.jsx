//the ProductsGrid that we made before for the featured products will  work right out of the box ,

//ProductsList component is the list view and ProductsGrid is the grid view and based on the button we click the list or  grid view will be  rendered
import { useLoaderData } from "react-router-dom";
import ProductsGrid from "./ProductsGrid";
import ProductsList from "./ProductsList";
import { useState } from "react";
import { BsFillGridFill, BsList } from "react-icons/bs";
import { FaHtml5 } from "react-icons/fa6";
const ProductsContainer = () => {
  const { meta } = useLoaderData();
  console.log(meta); //meta has pagination property which is an object with page , pageCount ,  pageSize and total
  const totalProducts = meta.pagination.total; //total  number of products

  const [layout, setLayout] = useState("grid"); //state variable that will control  the layout whether  it is grid or list view

  //function for button css styles  , function looks for the pattern  in the button
  const setActiveStyles = (pattern) => {
    //the styles before the dollar are ALWAYS  applied regardless od whether its  active or not
    return `text-xl btn btn-circle btn-sm ${
      pattern === layout
        ? "btn-primary text-primary-content"
        : "btn-ghost text-based-content"
    }`; //styles that will be applied to the active button ?
  };
  return (
    <>
      {/*HEADER  totals on one side and the buttons on the right side*/}
      <div className="flex justify-between items-center  mt-8 border-b border-base-300 pb-5">
        <h4 className="font-medium text-md ">
          {/* if more that one product then add the s  */}
          {totalProducts} product{totalProducts > 1 && "s"}
        </h4>
        <div className="flex gap-x-2">
          {/* this is  the grid button */}
          <button
            type="button"
            onClick={() => setLayout("grid")}
            className={setActiveStyles("grid")}
          >
            <BsFillGridFill />
          </button>
          <button
            type="button"
            onClick={() => setLayout("list")}
            className={setActiveStyles("list")}
          >
            {/* this is  the list button */}
            <BsList />
          </button>
        </div>
      </div>

      {/*PRODUCTS to show list or grid  , nested ternary  operator below like nested if */}
      <div>
        {totalProducts === 0 ? (
          <h5 className="text-2xl mt-16">
            Sorry , no products matched your search
          </h5>
        ) : layout === "grid" ? (
          <ProductsGrid />
        ) : (
          <ProductsList />
        )}
      </div>
    </>
  );
};
export default ProductsContainer;
