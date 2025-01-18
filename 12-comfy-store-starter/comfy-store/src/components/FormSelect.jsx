//this is the component that  has all the list values for the select
//just like FormInput component that we created this is the FormSelect component
const FormSelect = ({ label, name, list, defaultValue, size }) => {
  return (
    // form-control is from daisyUI
    <div className="form-control">
      <label htmlFor={name} className="label">
        <span className="label-text capitalize">{label}</span>
      </label>
      <select
        name={name}
        id={name}
        defaultValue={defaultValue}
        className={`select select-bordered ${size}`}
      >
        {/* for every element in the list return  an option as it is a a dropdown */}
        {list.map((item) => {
          return (
            <option key={item} value={item}>
              {item}
            </option>
          );
        })}
      </select>
    </div>
  );
};
export default FormSelect;
