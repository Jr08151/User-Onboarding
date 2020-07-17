import React, { useState, useEffect } from 'react'; // import hooks
import * as yup from 'yup'; // yup for everything
import axios from 'axios';


// Setting up our Schema

//Set up what the use is required or not required to input
const formSchema = yup.object().shape({
   name: yup.string().required('Name is required'),
   email: yup.string().email().required('Must include the email'),
   password: yup.string().required('Password is required'),
   terms: yup.boolean().oneOf([true], "Please agree to Terms and Conditions.") 
})



//Create our form component here
const Form = () => {

//Set state for the form itself -- for all the inputs
const [formState, setFormState] = useState({
    name:"",
    email:"",
    password:"",
    terms:""
})

//Set state for all the errors
const [errors, setErrors] = useState({
    name:"",
    email:"",
    password:"",
    terms:""
})

// State for the button disable
const [buttonDisabled, setButtonDisabled] = useState(true);
//New state to set our post request too. So we can console.log and see it
const [post, setPost] = useState([]);


useEffect(() => {



   
    formSchema.isValid(formState) 


    .then(valid => {
        setButtonDisabled(!valid);
        // console.log(valid);
    });

}, [formState]) 



const validateChange = event => {
    
     yup
     .reach(formSchema, event.target.name)
     .validate(event.target.value)
     .then(valid =>{
         setErrors({
             ...errors, 
             [event.target.name]: ""
         });
     }).catch(err => {
         setErrors({
             ...errors, [event.target.name]: err.errors
             
         });
     });
};


//Form submit here
const formSubmit = event => {
    event.preventDefault();
    
    axios
    .post('https://reqres.in/api/users', formState)
    .then(res => {
        setPost(res.data);
        console.log("success", post)

        setFormState({
            name:"",
            email:"",
            password:"",
            terms:""
        });
    })
    .catch(err => {
        console.log(err.res);
    })
}



const inputChange = event => {

    event.persist(); 
    const newFormData = {
        ...formState,
        [event.target.name]:
        event.target.type === "checkbox" ? event.target.checked : event.target.value
    };      
    validateChange(event);
    setFormState(newFormData);
}

    return (
        <form onSubmit={formSubmit}>

            <label htmlFor="name">Name</label>
                <input 
                    value={formState.name} 
                    id="name"  
                    type="text"
                    name="name"
                    onChange={inputChange}
            /> <br/>

            <label htmlFor="email">Email</label>
                <input 
                    value={formState.email} 
                    id="email"
                    type="text" 
                    name="email"
                    onChange={inputChange}
            /> <br/>

            <label htmlFor="password">Password</label>
                <input            
                    value={formState.password}  
                    id="password"
                    type="password"
                    name="password"
                    onChange={inputChange}
            /> <br/>

            <label htmlFor="terms">Please agreed to Terms of Service</label>
                <input      
                    id="terms"   
                    type="checkbox"
                    name="terms"
                    checked={formState.terms} 
                    onChange={inputChange}
             /> <br/>
            <pre>{JSON.stringify(post, null, 2)}</pre>
            <button disabled={buttonDisabled}>
               Submit
            </button>            
            
        </form>
    )
}

export default Form;