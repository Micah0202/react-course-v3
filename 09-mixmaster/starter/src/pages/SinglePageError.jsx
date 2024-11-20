import { useRouteError } from "react-router-dom";
//dont forget to  add this component to index.js

const SinglePageError = () => {
  const error = useRouteError();
  console.log(error);
  return <h2>There was an error...</h2>;
};
export default SinglePageError;
