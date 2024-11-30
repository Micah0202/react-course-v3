//this SubmitBtn will  be used on both the login and register 
//gets text as prop ie the text inside the button
import {useNavigation } from "react-router-dom"
const SubmitBtn = ({text}) => {
    const navigation = useNavigation() ; //to know the naviagtion state  ie  submitting , loading , idle 
    const isSubmitting = navigation.state ==="submitting" ; //boolean
  return (
    // when isSubmitting is true then button will be disabled 
    <button className="btn btn-primary btn-block" disabled={isSubmitting}>
        {
            isSubmitting ? <>
             <span className="loading loading-spinner"></span>
             sending...
            </>: text || 'submit' 
        }
        </button>

  )
}
export default SubmitBtn