import { FormInput,SubmitBtn } from "../components" ;
import {Form ,Link} from "react-router-dom"; //it takes the method as well 
const Login = () => {
  return (
    // the form is below 
    <section className= "h-screen grid place-items-center">
       <Form method="post" className ="card w-96 p-8 bg-base-100 shadow-lg  gap-y-4" >
           <h4 className="text-center text-3xl  font-bold ">Login</h4>
           {/* identifier is the value that the api  was expecting ie name=identifier  */}
           <FormInput type="email" label="email" name="identifier" defaultValue ="test@testuser.com"/>

           <FormInput type="password" label="password" name="password" defaultValue="secret" />

           {/* set up a div for 2 buttons */}
           <div className="mt-4">
             <SubmitBtn text="login"/>
             
            </div>
            <button type="button" className="btn btn-secondary btn-block">Guest user</button>
             <p className="text-center">
              Not a member yet ? <Link to="/register" className="ml-2 link link-hover link-primary capitalize">
              Register
              </Link>
             </p>
       </Form> 
    </section>
  )
}
export default Login