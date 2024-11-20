import { Form, redirect, useNavigation } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

//TODO - below is the url where we are going to submit the form ie server url

const newsletterUrl = "https://www.course-api.com/cocktails-newsletter";
//setup  the action and export it as we need to  set it up in the App.jsx
//TODO - similar to  loader and here also we get a useful  object in the parameter
export const action = async ({ request }) => {
  const formData = await request.formData(); //gives you all the information submitted in the form
  const data = Object.fromEntries(formData); //will give us an object with the  email  , lastName , name

  try {
    //make post request to server
    const response = await axios.post(newsletterUrl, data);
    toast.success(response.data.msg);

    // console.log(request); //GIVES  THE method , url  , input values in the formData etc
    //redirect should only be used in the action and loaders
    return redirect("/");
  } catch (error) {
    //have to  return an error here
    toast.error(error?.response?.data?.msg);
    return error;
  }
};

const Newsletter = () => {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting"; //isSubmitting will be true if the state is submitting
  return (
    <Form className="form" method="POST">
      <h4 style={{ textAlign: "center", marginBottom: "2rem" }}>
        Our Newsletter
      </h4>
      {/*name */}
      <div className="form-row">
        <label htmlFor="name" className="form-label">
          name
        </label>
        <input
          type="text"
          className="form-input"
          name="name"
          id="name"
          required
        />
      </div>
      {/*lastName */}
      <div className="form-row">
        <label htmlFor="lastName" className="form-label">
          Last Name
        </label>
        <input
          type="text"
          className="form-input"
          name="lastName"
          id="lastName"
          required
        />
      </div>
      {/*email */}
      <div className="form-row">
        <label htmlFor="email" className="form-label">
          email
        </label>
        <input
          type="text"
          className="form-input"
          name="email"
          id="email"
          defaultValue="test@test.com"
          required
        />
      </div>
      <button
        type="submit"
        className="btn btn-block"
        style={{ marginTop: "0.5rem" }}
        disabled={isSubmitting}
      >
        {isSubmitting ? "submitting" : "submit"}
      </button>
    </Form>
  );
};
export default Newsletter;
