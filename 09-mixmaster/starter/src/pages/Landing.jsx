//where we will  fetch all of the cocktails

import { useLoaderData } from "react-router-dom";
import axios from "axios";
import CocktailList from "../components/CocktailList";

const cocktailSearchUrl =
  "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=a"; //whatever value is after the question mark is the search term , cannot leave a blank space after the  =  as then we will  get  an error of no data found and data will  be a string and not an array

//here we will define the  loader function WHICH IS NOT A HOOK
export const loader = async () => {
  const searchTerm = ""; //any value after the equal  to  is the search term
  const response = await axios.get(`${cocktailSearchUrl}${searchTerm}`);
  //  console.log(response);//response is an object with a data property that has an array of drinks
  //  return 'something';
  return { drinks: response.data.drinks, searchTerm }; //searchTerm is used in react query and response.data.drinks is an array , searchTerm will make sense for react  query
};

const Landing = () => {
  const { drinks, searchTerm } = useLoaderData(); //data has whatever the loader returns ie the array of objects where  each object is a drink
  console.log(drinks);
  return (
    <>
      <CocktailList drinks={drinks} />
    </>
  );
};
export default Landing;
