import React from 'react'
import { useState } from 'react';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import Nav from './Nav'
function Register() {
  //As Register Component for user account creation
  //navigate to navigate to another router
  const navigate=useNavigate()
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [Role, setRole] = useState('');
  const [Companyname, setCompany] = useState('');
  let handlefunction=function(e){
    e.preventDefault()
    axios.post("https://fypbackend-13p3.onrender.com/user/Register",{name:name,email:email,password:password,Role:Role,Companyname:Companyname}).then((res)=>{
      //After successfully creation of user profile navigate to login
      navigate('/Login');
    }).catch((err)=>console.log(err))
  }
  return (
    <>
    <Nav/>

    <div className='login-row'>
    <form className='login-form' onSubmit={handlefunction}>
        <input type='text' placeholder='UserName' onChange={(e)=>setName(e.target.value)}></input>    
        <input type='email' placeholder='UserEmail' onChange={(e)=>setEmail(e.target.value)}></input>    
        <input type='password' placeholder='Password' onChange={(e)=>setPassword(e.target.value)}></input>
        <label>
      <input type='radio' name='role' value='Normal' onChange={(e)=>setRole(e.target.value)} />
       Normal
      </label>
      <label>

      <input type='radio' name='role' value='Recruiter' onChange={(e)=>setRole(e.target.value)} />
      Recruiter
       </label>

        {Role==='Recruiter' && <input type='text' placeholder='Companyname' onChange={(e)=>{
          setCompany(e.target.value)}}></input>}
        <br></br>
        <button className='login' type='submit'>Register</button>
        <br></br>
        <p>I have acccount</p> <a onClick={()=>{
//user has account alredy to can navigate with click above
          navigate('/Login')
        }}>login</a>
        <br></br>
    </form>
</div>
          </>
  );
}

export default Register
