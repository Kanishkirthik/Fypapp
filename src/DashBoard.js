import React from 'react'
import Nav from './Nav'
import { useState ,useEffect} from 'react'
import {Cookies} from 'react-cookie'
import axios from 'axios'
function DashBoard() {
  const cookie =new Cookies()
  const[data,setData]=useState({
    'jobTitle':'',
    'jobDescription':'',
    'salary':'',
    'requirement':'',
    'experience':'',
    'location':'',
    'date':'',
    'status':''
  })
  const[Dataset,setDs]=useState([])
  const[Updation,setUpdation]=useState(false)

  let user=cookie.get('UserId')
  let handleSubmit=function(e){
    e.preventDefault();
    axios.post('https://fypbackend-13p3.onrender.com/Recuiter/Create',{Companyname:cookie.get('Companyname'),JobTitle:data.jobTitle,JobDescription:data.jobDescription,Salary:data.salary,Requirement:data.requirement,Experience:data.experience,Location:data.location,Date:data.date,Status:data.status,Userid:cookie.get('UserId')},{headers:{
      'Content-Type':'application/json',
      'Accept':'application/json',
      'Authorization': `bearer ${cookie.get('Authentication_Token')}`
    }}).then((data)=>{
      console.log(data)
    }).catch((err)=>{
      console.log(err)
    })
  }
  let handleUpdate =function(){
    axios.patch(`https://fypbackend-13p3.onrender.com/Recuiter/Update/${user}`,{Companyname:cookie.get('Companyname'),JobTitle:data.jobTitle,JobDescription:data.jobDescription,Salary:data.salary,Requirement:data.requirement,Experience:data.experience,Location:data.location,Date:data.date,Status:data.status,Userid:cookie.get('UserId')},{headers:{
      'Content-Type':'application/json',
      'Accept':'application/json',
      'Authorization': `bearer ${cookie.get('Authentication_Token')}`
    }}).then((data)=>{console.log(data.data)}).catch((err)=>{
      console.log(err)
    })
    
  }
  useEffect(()=>{
    let getData=async function(){
    await axios.get(`https://fypbackend-13p3.onrender.com/Recuiter/get/${user}`,{headers:{
      'Authorization': `bearer ${cookie.get('Authentication_Token')}`,
      'Content-Type': 'application/json'
    }}).then((Response)=>{
      setDs(Response.data)
    }).catch((err)=>{
      console.log(err)
    })
  }
  getData()
  },[])
  console.log(Dataset)

  return (
    <>
    <Nav/>
    <div className='container'>
        <h3>"Offering opportunities to millions of employees is not just about filling positions; it's about shaping futures"</h3>
        <div className='card'>

        </div>
        <div clasName="Dashboard">
            <div className='card'>
                <form className='create' onSubmit={handleSubmit}>
                    <input type='text' value={data.jobTitle} placeholder='Job Title' onChange={(e)=>{
                      setData({...data,jobTitle:e.target.value})
                    }}></input>
                    <textarea type="text"  value={data.jobDescription} placeholder='Job Description' onChange={(e)=>{
                      setData({...data,jobDescription:e.target.value})
                    }}>
                    </textarea>
                    <input type='number' value={data.salary}  id='salary' placeholder='Salary' onChange={(e)=>{
                      setData({...data,salary:e.target.value})
                    }}></input>
                    <input type='text' id='req' value={data.requirement} placeholder='Requirement' onChange={(e)=>{
                      setData({...data,requirement:e.target.value})
                    }}></input>
                    <input type='number' id='exp'  value={data.experience} placeholder='Experience' onChange={(e)=>{
                      setData({...data,experience:e.target.value})
                    }}></input>
                    <input type='text' value={data.location} id='loc'placeholder='Location' onChange={(e)=>{
                      setData({...data,location:e.target.value})
                    }}></input>
                    <input type='date' value={data.date} id='date' placeholder='Date' onChange={(e)=>{
                      setData({...data,date:e.target.value})
                    }}></input>
                    <input type='text' id='status' value={data.status} placeholder='Status' onChange={(e)=>{
                      setData({...data,status:e.target.value})
                    }}></input>
                    {!Updation && <button class='Create'>Submit</button>}
                    {Updation && <button class='Create' onClick={handleUpdate}>Update</button>}
                </form>
            </div>
{Dataset.map((e)=>(
<div className='card'>
  <div className='card2'>
                  <div className='card-header'>
                    <img src='https://th.bing.com/th/id/R.c72c8a7942b125e0c221932579f9e692?rik=bj4R3tzxmwFWQA&riu=http%3a%2f%2fs3.amazonaws.com%2fimages.seroundtable.com%2fgoogle-hiring-1507635499.jpg&ehk=TV8oDdyWDi37UyofZ1frL3MnZPaWR8j7rib5Gp8TwhY%3d&risl=&pid=ImgRaw&r=0'></img>
                  </div>
                  <div className='card-body'>
                    <p className='card-title'>{e.JobTitle}</p>
                    <p>{e.JobDescription}</p>
                  </div>
                  <div className='card-footer'>
                    <button onClick={()=>{
                      setData({...data,jobTitle:e.JobTitle,jobDescription:e.JobDescription,salary:e.Salary,requirement:e.Requirement,experience:e.Experience,location:e.Location,date:e.Date,status:e.Status})
                      setUpdation(true)
                    }}>Update</button>
                    <button onClick={()=>{
                      axios.delete(`https://fypbackend-13p3.onrender.com/Recuiter/Update/${user}`,{JobTitle:e.JobTitle},{headers:{
                        'Authorization': `bearer ${cookie.get('Authentication_Token')}`,
                        'Content-Type': 'application/json'
                      }}).then((Response)=>console.log(Response.data)).catch((err)=>{
                        console.log(err)
                      })
                    }}>Delete</button>
                    </div>
                </div>
  </div>
))
}
            </div>
                  
    </div>
    </>
    
  )
}


export default DashBoard
