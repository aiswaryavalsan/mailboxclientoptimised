import React, { useRef, useState } from 'react'
import MyCard from '../layout/MyCard'
import MyButton from '../layout/MyButton'
import ToggleButton  from './ToggleButton'
import { useDispatch } from 'react-redux'
import { authActions } from '../../store/AuthSlice'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'

const Signup = () => {
    const [signup,setSignup]=useState(true);
    const[error,setErrors]=useState({});
    const[formValid,setFormValid]=useState(true);
    const dispatch=useDispatch();
    const history=useHistory();

    
    const emailRef=useRef();
    const passwordref=useRef();
    const cofirmPswdRef=useRef();
    const handleToggleHandler=()=>{
        setSignup(prev=>!prev);
        setErrors({});
    }
    const validateForm=()=>{
        const newErrors={};
        if(!emailRef.current.value.trim()){
            newErrors.email='Email is required'
        }
        if(!passwordref.current.value.trim()||passwordref.current.value.length<6||passwordref.current.value!==cofirmPswdRef.current.value){
            if(!passwordref.current.value.trim()){
                newErrors.password='Password required';
            }
            else if(passwordref.current.value.length<6) {
               newErrors.password='password must be 6 character length'
            }
            else{
                newErrors.confirmPswd='Password is not matching..'
            }
        }
       
        setErrors(newErrors);
        setFormValid(Object.keys(newErrors).length === 0);
    }
    const authButtonHandler=async(e)=>{
        e.preventDefault();
      
        if(signup&&formValid){
            validateForm();
            try{
            const response=await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyB715ZzlBe76wM6_GzKZOd4kEyDgWliO4I',
            {method:'POST',
            body:JSON.stringify(
                {email:emailRef.current.value,password:passwordref.current.value,returnSecureToken:true}),
                headers:{'Content-Type': 'application/json'}})
                const data=await response.json();
                if(!response.ok){
                 
                 throw new Error(data.error.message);
                }
                else{
                    alert("successfully registered")
                }
               
               
            }catch(error){
              alert(error)

            }
            
        }
        else{
            try{
            const response=await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyB715ZzlBe76wM6_GzKZOd4kEyDgWliO4I',
            {method:'POST',
            body:JSON.stringify({email:emailRef.current.value,
                password:passwordref.current.value,
                returnSecureToken:true
              
            }),
            headers:{'CONTENT-TYPE':'APPLICATION/JSON'}})
            if(response.ok){
                const data=await response.json();
                console.log(data.idToken);
                dispatch(authActions.login({email:emailRef.current.value,token:data.idToken}))
             history.push('/home');
            }
            else{
                const data=await response.json();
                throw new Error(data.error.message);
            }
        }catch(error){
            alert(error);

        }
        }


    }
  return (
   <MyCard >
    <h1>{signup?'Signup':'Login'}</h1>
    <form onSubmit={authButtonHandler}>
    <div className='container'>
    <label htmlFor="email">Email</label><br/>
    <input type="email" id="email" ref={emailRef}></input>
    <div>{signup&&error&&<p>{error.email}</p>}</div>
    <label htmlFor="password">Password</label>
    <input type="password" id="password" ref={passwordref}></input>
    {error.password&&<div><p>{error.password}</p></div>}
   {
   signup&&<><label htmlFor="cnfpsw">Confirm Password</label>
    <input type="password" id="cnfpsw" ref={cofirmPswdRef}></input>
    {error.confirmPswd&&<div><p>{error.confirmPswd}</p></div>}
    </>
    }
    <MyButton type="submit">{signup?'Signup':'Login'}</MyButton>
    </div>
    </form>
    <ToggleButton handleToggleButton={handleToggleHandler} signup={signup}/>
    
   </MyCard>
  )
}

export default Signup