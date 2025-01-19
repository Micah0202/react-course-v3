import { BsTrophy } from "react-icons/bs";
import { FormInput, SubmitBtn } from "../components";
import { Form, Link, redirect } from "react-router-dom";
import { customFetch } from "../utils";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";

//TODO -  SINCE we are using Form then  the React Routers Form component automatically sends data to  the action function  tied to the route , the function is exported so React Router can link it to a route
export const action = async ({ request }) => {
  const formData = await request.formData(); //gets all the data submitted in the form
  const data = Object.fromEntries(formData); //The Object.fromEntries() method converts the FormData object into a plain JavaScript object.
  try {
    //calling the register user api , the response has the jwt token also
    const response = await customFetch.post("/auth/local/register", data); //passing the body ie whatever you  get from the form  , since the name is what the server is looking for there should not be any problem .also Object.entries is needed to create the proper body data , the kind we pass in Postman
    toast.success("account created successfully");
    return redirect("/login");
  } catch (error) {
    const errorMessage =
      error?.response?.data?.error?.message ||
      "please double check your credentials";
    toast.error(errorMessage);
    return null;
  }
};

const Register = () => {
  return (
    <section className="h-screen grid place-items-center">
      <Form
        method="POST"
        className="card w-96 p-8 bg-base-100 shadow-lg flex flex-col gap-y-4  "
      >
        <h4 className="text-center text-3xl font-bold">Register</h4>

        <FormInput type="text" label="username" name="username" />
        <FormInput type="email" label="email" name="email" />
        <FormInput type="password" label="password" name="password" />
        <div className="mt-4">
          <SubmitBtn text="register" />
        </div>
        <p className="text-center">
          Already a member ?{" "}
          <Link
            to="/login"
            className="ml-2 link link-hover link-primary capitalize"
          >
            Login
          </Link>
        </p>
      </Form>
    </section>
  );
};
export default Register;
