//dont forget to  add this component to index.js
const SinglePageError = () => {
    const error = useRouteError();
    console.log(error);
  return (
    <h2>{error.message}</h2>
  )
}
export default SinglePageError