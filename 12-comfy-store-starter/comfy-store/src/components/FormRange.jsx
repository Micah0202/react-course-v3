/* eslint-disable react/prop-types */
//similar to FormInput and FormSelect
import { formatPrice } from "../utils";
import { useState } from "react";
const FormRange = ({ label, name, size, price }) => {
  const step = 1000; //step is 10 dollars
  const maxPrice = 100000; //ie 1000 dollars

  //state value ie the price on the stepper
  const [selectedPrice, setSelectedPrice] = useState(price || maxPrice); //use the price if it was already set before , initially when we navigate there wont bve any query param initilaly
  return (
    <div className="form-control">
      <label htmlFor={name} className="label cursor-pointer">
        {/* This value is passed to setSelectedPrice to update the state, which:
        Updates the slider's visual position to match the new value.
        Dynamically updates the value shown in the <label> next to the slider, thanks to React's re-rendering. */}
        <span className="label-text capitalize">{label}</span>
        <span>{formatPrice(selectedPrice)}</span>
      </label>
      {/* onChange is triggered when  the user moves the slider .     e.target.value gives the current value of the range input (a string representing the new slider position). */}
      <input
        type="range"
        name={name}
        min={0}
        max={maxPrice}
        value={selectedPrice}
        onChange={(e) => {
          setSelectedPrice(e.target.value);
        }}
        step={step}
        className={`range range-primary ${size}`}
      />

      {/*display the min and the max for the  price range   */}
      <div className="w-full flex justify-between text-xs px-2 mt-2 ">
        <span className="font-bold text-md">0</span>
        <span className="font-bold text-md">Max : {formatPrice(maxPrice)}</span>
      </div>
    </div>
  );
};
export default FormRange;
