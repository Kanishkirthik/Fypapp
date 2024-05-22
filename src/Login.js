import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom'
import axios from 'axios';
import { Cookies } from 'react-cookie';
function Login() {
  const[email,setemail]=useState('')
  const[password,setPassword]=useState('')
  const navigate=useNavigate()
  const cookies=new Cookies()
  let handlefunction=(e)=>{
    e.preventDefault();
    axios.post('https://fypbackend-13p3.onrender.com/User/Login',{email:email,password:password}).then((response)=>{
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
    
    <div className='login-row'>
        <form className='login-form' onSubmit={handlefunction}>
            <input type='email' placeholder='UserEmail' onChange={(e)=>setemail(e.target.value)}></input>    
            <input type='password' placeholder='Password' onChange={(e)=>setPassword(e.target.value)}></input>
            <br></br>
            <button className='login' type='submit'>Login</button>
            <br></br>
            <p>I Don't have acccount</p> <a onClick={()=>{
              navigate('/Register')
            }}>Register</a>
            <br></br>
        </form>
    </div>
  )
}

export default Login
