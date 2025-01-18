//this is the ProductsGrid
import { Link, useLoaderData } from "react-router-dom";
import { formatPrice } from "../utils";
//useLOaderData to  access the data the loader from Landing is returning
const ProductsGrid = () => {
  const { products } = useLoaderData(); //this gets the data from the relevant loader
  //console.log(products);//products is an array of 2 objects
  return (
    <div className="pt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3 ">
      {products.map((product) => {
        const { title, price, image } = product.attributes; //id is not inside attributes
        //each product will be a Link
        const dollarsAmount = formatPrice(price);
        return (
          <Link
            key={product.id}
            to={`/products/${product.id}`}
            className="card w-full  shadow-xl hover:shadow-2xl transition duration-300 "
          >
            <figure className="px-4 pt-4">
              <img
                src={image}
                alt={title}
                className="rounded-xl h-64 md:h-48 w-full object-cover"
              />
            </figure>
            <div className="card-body items-center text-center">
              {/*This div will have the title and the image */}
              <h2 className="card-title capitalize tracking-wider">{title}</h2>
              <span className="text-secondary">{dollarsAmount}</span>
            </div>
          </Link>
        );
      })}
    </div>
  );
};
export default ProductsGrid;
