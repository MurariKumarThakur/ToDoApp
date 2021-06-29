import React,{useState} from 'react'
import './Registration.css'
import {Link, Route} from 'react-router-dom'
import validator from 'validator'
import AlertCustom from './Alert'
import Alert from '@material-ui/lab/Alert';
import {useHistory} from 'react-router-dom';

import { db,auth } from './firebase';
const Registration = () => {
    
     const [email,setEmail] =useState('');
     const [password,setPassword]=useState('');
     const [confirmPassword,setConfirmPassword]=useState('');
     const [message,setMessage]=useState("");
     const [severity,setseverity]=useState("error")
     const history=useHistory();

     const clearMessageAfter5Sec=()=>{
         setTimeout(() => {
            setMessage("")
         }, 5000);
     }
     const clearInputField=()=>{
       
      setEmail("");
      setPassword("");
      setConfirmPassword("");
     }
    const handleSumbit= async(e)=>{ 
        e.preventDefault();

       if(!validator.isEmail(email)){
         setMessage("Email must be  valid")

         clearMessageAfter5Sec();
       
         return
       }

      if(password !== confirmPassword){
        setMessage("Password must be same") 
        clearMessageAfter5Sec();
         return
      }

      if(password.length < 6){
        setMessage("Password should be at least 6 characters")  
        clearMessageAfter5Sec();
        return
      }




         try{
          const result =  await auth.createUserWithEmailAndPassword(email,password);
             console.log( 'Welcome ' ,result.user.email);
            setseverity('success')
            setMessage('Welcome , '+ result.user.email)
            clearMessageAfter5Sec();

            clearInputField();
            history.push("/home")
         }catch(e){
         
           
           setMessage(e.message);
           clearMessageAfter5Sec();
           clearInputField()
         }
  

         
        

         
       



         

    }

    return (
        <div className='registration_page'>
          
          <div className="registration_logo">
          <i className="fas fa-list-ol"/>
          </div>
              <h1 className='registration_header'>Sign Up to MyTaskTracker</h1>
              <div style={{marginBottom:"5px"}}>{message ? <Alert  severity={severity} >{message}</Alert>:""}</div>
               <div className="userRegistration">
                   <form action="">
                    <div className='registration_input'>
                    <label htmlFor="">Email</label><br/>
                   <input value={email} onChange={(e)=>setEmail(e.target.value)}    type="email" required/>

                    </div>
                 

                    <div className='registration_input'>
                    <label htmlFor="">Password</label><br/>
                   <input value={password} onChange={(e)=>setPassword(e.target.value)}  type="password"  required/>

                    </div>

                    <div className='registration_input'>
                    <label htmlFor="">Confirm Password</label><br/>
                   <input value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)}  type="password" required />

                    </div>
          
                     <button onClick={handleSumbit} type='submit' className="regButton" disabled={!email || !password || !confirmPassword}>Sign Up</button>

                   </form>
                   <div className="logLink">

<p>Already have Account ? <Link to='/login'> <b > <u>Login to the app </u> </b> </Link>.</p>
</div>
               </div>
          </div>
         
        
    
    )
}

export default Registration
