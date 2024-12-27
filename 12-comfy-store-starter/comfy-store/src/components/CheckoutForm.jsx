//the form that has the Shipping Information ie the First Name input field and the Address input field . When we submit the form the action is  called immediately
import { Form, redirect } from "react-router-dom";
import FormInput from "./FormInput";
import SubmitBtn from "./SubmitBtn";
import { customFetch, formatPrice } from "../utils";
import { toast } from "react-toastify";
import { clearCart } from "../features/cart/cartSlice";

//action  where we will post the data to  the server and update the state as well so we will  need access to the store so use the same approach of action being a function that returns a function
export const action = (store) => async () => {
  console.log(store); //can log the store here inside the innermost function due to  closures
  return null;
};
const CheckoutForm = () => {
  return (
    <Form method="POST" className="flex flex-col gap-y-4">
      <h4 className="font-medium text-xl">Shipping information</h4>
      {/* name='name' is what the server looks for  */}
      <FormInput label="first name" name="name" type="text" />
      <FormInput label="address" name="address" type="text" />
      <div className="mt-4">
        <SubmitBtn text="place your order" />
      </div>
    </Form>
  );
};

export default CheckoutForm;
