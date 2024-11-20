import Wrapper from "../assets/wrappers/ErrorPage"
import {Link , useRouteError} from 'react-router-dom';
import img from '../assets/not-found.svg'

const Error = () => {
  const error = useRouteError();
  console.log(error); 
  if(error.status === 404){
    //display the error image 
    return (<Wrapper>
      <div>
        <img src={img} alt="not found" />
        <h3>Ohh!</h3>
        <p>We cant seem to find the page u are looking for</p>
        <Link to="/" >back home</Link>
      </div>
    </Wrapper>)
    
  }

  return (<Wrapper>
    <div>
      <h3>something went wrong </h3>
    </div>
  </Wrapper>)
 
}
export default Error