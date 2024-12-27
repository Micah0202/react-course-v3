import { FormInput, SubmitBtn } from "../components";
import { Form, Link, redirect, useNavigate } from "react-router-dom";
import { customFetch } from "../utils"; //to make
import { toast } from "react-toastify";
import { loginUser } from "../features/user/userSlice";
import { useDispatch } from "react-redux";

//we need to  access  the dispatch in the action but you can use the useDispatch()  hook inside an action
export const action =
  (store) =>
  async ({ request }) => {
    //the above request has the identifier and the password
    const formData = await request.formData(); //gets all the data submitted in the form
    const data = Object.fromEntries(formData);
    try {
      const response = await customFetch.post("/auth/local", data);
      //  console.log(response);//the response.data will have the jwt token and all the user details
      store.dispatch(loginUser(response.data)); //pass the entire response.data and destructure it in the user slice
      //calling the login user api
      toast.success("logged in  successfully");
      return redirect("/"); //redirect tot the home page
    } catch (error) {
      const errorMessage =
        error?.response?.data?.error?.message ||
        "please double check your credentials";
      toast.error(errorMessage);
      return null;
    }
  };

const Login = () => {
  //FOR GUEST  USER we dont need to  access  the store inside the action , you can directly use dispatch  inside the component
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loginAsGuestUser = async () => {
    try {
      const response = await customFetch.post("/auth/local", {
        identifier: "test@test.com",
        password: "secret",
      }); //hardcode the data for the server
      dispatch(loginUser(response.data));
      toast.success("welcome guest user");
      navigate("/");
    } catch (error) {
      console.log(error);
      toast.error("Guest user login error , please try again");
    }
  };
  return (
    // the form is below
    //React router form automatically calls the action when  the Form is submitted
    <section className="h-screen grid place-items-center">
      <Form
        method="post"
        className="card w-96 p-8 bg-base-100 shadow-lg  gap-y-4"
      >
        <h4 className="text-center text-3xl  font-bold ">Login</h4>
        {/* identifier is the value that the api  was expecting ie name=identifier  */}
        <FormInput type="email" label="email" name="identifier" />

        <FormInput type="password" label="password" name="password" />

        {/* set up a div for 2 buttons */}
        <div className="mt-4">
          <SubmitBtn text="login" />
        </div>
        <button
          type="button"
          className="btn btn-secondary btn-block"
          onClick={loginAsGuestUser}
        >
          Guest user
        </button>
        <p className="text-center">
          Not a member yet ?{" "}
          <Link
            to="/register"
            className="ml-2 link link-hover link-primary capitalize"
          >
            Register
          </Link>
        </p>
      </Form>
    </section>
  );
};
export default Login;
