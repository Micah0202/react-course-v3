//TODO - THIS IS THE COCKTAIL DETAILS COMPONENT
import axios from "axios";
import { useLoaderData, Link, Navigate } from "react-router-dom";
import Wrapper from "../assets/wrappers/CocktailPage";

const singleCocktailUrl =
  "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i="; //url for the details of cocktail page

export const loader = async ({ params }) => {
  //data ie the obejct in the above paramter that we have destrcutured is an object with proerties such as id , context ,request etc
  //console.log(data);
  const { id } = params;
  //once we have the id make the request to the api  to  get the data
  const { data } = await axios.get(`${singleCocktailUrl}${id}`);
  //console.log(response);
  return { id, data }; // will use the id later for react query
};

const Cocktail = () => {
  const { id, data } = useLoaderData(); //to use the stuff returned by the above loader

  //if there is no data then return
  //if (!data) return <h2>something went wrong</h2>;
  if (!data) return <Navigate to="/" />;
  const singleDrink = data.drinks[0]; //data is an array with just one drink ie the drink ka details we clicked on
  const {
    strDrink: name,
    strDrinkThumb: image,
    strAlcoholic: info,
    strCategory: category,
    strGlass: glass,
    strInstructions: instructions,
  } = singleDrink; //renaming the object ka property names

  const validIngredients = Object.keys(singleDrink)
    .filter(
      (key) => key.startsWith("strIngredient") && singleDrink[key] !== null
    )
    .map((key) => singleDrink[key]); //validIngredients is an  array with all the properties ,filter and store only if strIngredient and if value is not null , from the array of keys we get the array of values

  return (
    <Wrapper>
      <header>
        <Link to="/" className="btn">
          Back home
        </Link>
        <h3>{name}</h3>
      </header>
      <div className="drink">
        <img src={image} alt={name} className="img" />
        <div className="drink-info">
          <p>
            <span className="drink-data">name :</span>
            {name}
          </p>
          <p>
            <span className="drink-data">category :</span>
            {category}
          </p>
          <p>
            <span className="drink-data">info :</span>
            {info}
          </p>
          <p>
            <span className="drink-data">glass :</span>
            {glass}
          </p>
          <p>
            <span className="drink-data">ingredients :</span>
            {validIngredients.map((item, index) => {
              return (
                <span className="ing" key={item}>
                  {item}
                  {index < validIngredients.length - 1 ? "," : ""}
                </span>
              );
            })}
          </p>
          <p>
            <span className="drink-data">instructions :</span>
            {instructions}
          </p>
        </div>
      </div>
    </Wrapper>
  );
};
export default Cocktail;
