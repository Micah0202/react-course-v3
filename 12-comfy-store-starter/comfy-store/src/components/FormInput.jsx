//the props are label  , name ,type (the type could be email etc)
//this is not the actual form these are just the input fields  
//FormInput from DaisyUI 
//add the size prop and based on that  size the input size will be defined 
const FormInput = ({label,name,type ,defaultValue ,size}) => {
  return (
    <label className="form-control">
    <div className="label">
      <span className="label-text capitalize">{label}</span>
    </div>
    <input type={type} name={name} defaultValue={defaultValue}className={`input input-bordered ${size}`}/>
    {/* adding the size prop as that decides the size of the input element  */}
     
  </label>
  )
}
export default FormInput