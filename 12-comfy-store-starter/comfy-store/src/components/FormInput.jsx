//the props are label  , name ,type (the type could be email etc)
//this is not the actual form these are just the input fields  
//FormInput from DaisyUI 
const FormInput = ({label,name,type ,defaultValue}) => {
  return (
    <label className="form-control">
    <div className="label">
      <span className="label-text">{label}</span>
    </div>
    <input type={type} name={name} defaultValue={defaultValue}className="input input-bordered "/>
     
  </label>
  )
}
export default FormInput