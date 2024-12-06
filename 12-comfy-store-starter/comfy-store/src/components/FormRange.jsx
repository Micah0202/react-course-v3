/* eslint-disable react/prop-types */
//similar to FormInput and FormSelect
import { formatPrice } from "../utils";
import { useState } from "react";
const FormRange = ({label , name ,size}) => {
    const step  = 1000;
    const maxPrice = 100000 ;//ie 1000 dollars
    
    //state value ie the price on the stepper
    const [selectedPrice , setSelectedPrice] = useState(maxPrice) ;
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
        <input type="range" name={name} min={0} max={maxPrice} value={selectedPrice} onChange={()=>{setSelectedPrice(e.target.value)}} />
    </div>
  )
}
export default FormRange ;