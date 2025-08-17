import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom'
import axios from 'axios';
import { Cookies } from 'react-cookie';
import Nav from './Nav'
function Login() {
  //store email and Password for login authentication using jwt token as respose  from backend server.
  const[email,setemail]=useState('')
  const[password,setPassword]=useState('')
  //To navigate to router url based on login response
  const navigate=useNavigate()
  //manage data and easly accessible and session management
  const cookies=new Cookies()
  let handlefunction=(e)=>{
    e.preventDefault();
    axios.post('https://fypbackend-13p3.onrender.com/user/Login',{email:email,password:password}).then((response)=>{
    cookies.set("Authentication_Token",response.data.Token,{path:'/'})
    cookies.set("Role",response.data.Role,{path:'/'})
    cookies.set("UserId",response.data.UserId,{path:'/'})
    cookies.set("name",response.data.name,{path:'/'})
    cookies.set("Companyname",response.data.Companyname,{path:'/'})
    console.log(response.data)
    navigate('/');
    })
  }
  return (
    <>
    //Nav Component
    <Nav/>
    //login form
    <div className='login-row'>
        <form className='login-form' onSubmit={handlefunction}>
            <input type='email' placeholder='UserEmail' onChange={(e)=>setemail(e.target.value)}></input>    
            <input type='password' placeholder='Password' onChange={(e)=>setPassword(e.target.value)}></input>
            <br></br>
            <button className='login' type='submit'>Login</button>
            <br></br>
            <p>I Don't have acccount</p> <a onClick={()=>{
              //navigate to register dont have account to login
              navigate('/Register')
            }}>Register</a>
            <br></br>
        </form>
    </div>
              </>
  )
}

export default Login
