//the form that has the Shipping Information ie the First Name input field and the Address input field . When we submit the form the action is  called immediately
import { Form, redirect } from "react-router-dom";
import FormInput from "./FormInput";
import SubmitBtn from "./SubmitBtn";
import { customFetch, formatPrice } from "../utils";
import { toast } from "react-toastify";
import { clearCart } from "../features/cart/cartSlice";
import { BsTrophy } from "react-icons/bs";

//action  where we will post the data to  the server and update the state as well so we will  need access to the store so use the same approach of action being a function that returns a function
export const action =
  (store) =>
  async ({ request }) => {
    // console.log(store); //can log the store here inside the innermost function due to  closures
    // return null;
    const formData = await request.formData();
    const { name, address } = Object.fromEntries(formData);

    //get the user
    const user = store.getState().userState.user;
    //get stuff from the cart
    const { cartItems, orderTotal, numItemsInCart } =
      store.getState().cartState;
    //next using the above data we have to  set up an object that is like the body that we pass in Postman while  making the request .

    //make sure the names match  the server names , below is  the data object that  we will be sending to the server
    const info = {
      name,
      address,
      chargeTotal: orderTotal,
      orderTotal: formatPrice(orderTotal), //orderTotal  is the formatted chargeTotal
      cartItems, //cartItems is an array where every item is an object and each object has these properties : amount, cartID , company , image , price , productColor , productID , title
      numItemsInCart,
    };

    try {
      //POSting it  to the create Order authenticated endpoint
      //along with the data in the 3rd parameter pass the token in the headers
      const response = await customFetch.post(
        "/orders",
        { data: info },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      // console.log(response);
      //if we successfully get a response , then clear the cart ,  then show  the success toast and then
      store.dispatch(clearCart());
      toast.success("order placed successfully");
      return redirect("/orders"); //redirect to the orders page when we are done
    } catch (error) {
      console.log(error);

      const errorMessage =
        error?.response?.data?.error?.message ||
        "please double check your credentials";
      toast.error(errorMessage);
      //403 if token is invalid
      if (error.response.status === 401 || 403) {
        return redirect("/login");
      }

      return null;
    }
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
