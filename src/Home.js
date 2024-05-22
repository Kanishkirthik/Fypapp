import React, { useState,useEffect } from 'react'
import Search from './Search'
import About from './About'
import Nav from './Nav'
import { useParams } from 'react-router-dom'
import  axios from 'axios'
import {Cookies} from 'react-cookie'
function Home() {
  const { id } = useParams()
  const cookie=new Cookies()
  const [data, setData] = useState([])
  let user=cookie.get('UserId')
  const [Ds,setDs]=useState([])
  useEffect(()=>{
    let getNormalData=async function(){
      await axios.get('https://fypbackend-13p3.onrender.com/get').then((res)=>{
        setDs(res.data)
      }).catch((err)=>{
        console.log(err)
      })
    }
    getNormalData()
  },[])
  useEffect(()=>{
    let getRecuiter= async function(){
      await axios.get(`https://fypbackend-13p3.onrender.com/Recuiter/get/${user}`,{headers:{
      'Authorization': `bearer ${cookie.get('Authentication_Token')}`,
      'Content-Type': 'application/json'
    }}).then((Response)=>{
      setData(Response.data)
    }).catch((err)=>{
      console.log(err)
    })
      }
      let getUser=async function(){
        await axios.get(`https://fypbackend-13p3.onrender.com/HiringChallenge/getUserHiring/${user}`,{headers:{
          'Authorization': `bearer ${cookie.get('Authentication_Token')}`,
          'Content-Type': 'application/json'
        }}).then((Response)=>{
          setData(Response.data)
        }).catch((err)=>{
          console.log(err)
        })
      }
      if (cookie.get('Role')==='Recruiter'){
        getRecuiter()
      }else{
        getUser()
      }
    },[])

    console.log(data)
  return (
    <>
    <Nav/>
    <div className='home'>
        <h3 >Find Your Dream Job</h3>
        <Search/>
        {cookie.get('Role')!='Recruiter' && <div className='jobs'>
          {Ds.map((d)=>(
          <div className='card'>
                  <div className='card-header'>
                    <img src='https://th.bing.com/th/id/R.c72c8a7942b125e0c221932579f9e692?rik=bj4R3tzxmwFWQA&riu=http%3a%2f%2fs3.amazonaws.com%2fimages.seroundtable.com%2fgoogle-hiring-1507635499.jpg&ehk=TV8oDdyWDi37UyofZ1frL3MnZPaWR8j7rib5Gp8TwhY%3d&risl=&pid=ImgRaw&r=0'></img>
                  </div>
                  <div className='card-body'>
                    <p className='card-title'>{d.JobTitle}</p>
                    <p>{d.JobDescription}</p>
                    <p style={{textAlign:'end'}}>Location:{d.Location}</p>
                    <p style={{textAlign:'end'}}>CTC:{d.Salary}</p>
                    <p style={{textAlign:'end'}}>DriveDate:{d.Date}</p>
                  </div>
                  <div className='card-footer'>
                  {cookie.get('Role')!='Recruiter' &&<button onClick={()=>{
                   axios.post('https://fypbackend-13p3.onrender.com/HiringChallenge/CreateUserHiring',{Companyname:d.Companyname,JobTitle:d.JobTitle,JobDescription:d.JobDescription,Date:d.Date,Status:d.Status,Userid:user},{headers:{
                    'Authorization': `bearer ${cookie.get('Authentication_Token')}`,
                    'Content-Type': 'application/json'
                  }}).then((res)=>{
                    console.log(res)
                  }).catch((err)=>{
                    console.log(err)
                  })
                  }}>Apply Now</button>}
                    </div>
          </div>
          ))}
        </div>
}
        <h3>Up-Coming Events</h3>
        {data.map((e)=>(
        <div className='Up-Comming'>
                <div className='card'>
                  <div className='card-header'>
                    <img src='https://th.bing.com/th/id/R.c72c8a7942b125e0c221932579f9e692?rik=bj4R3tzxmwFWQA&riu=http%3a%2f%2fs3.amazonaws.com%2fimages.seroundtable.com%2fgoogle-hiring-1507635499.jpg&ehk=TV8oDdyWDi37UyofZ1frL3MnZPaWR8j7rib5Gp8TwhY%3d&risl=&pid=ImgRaw&r=0'></img>
                  </div>
                  <div className='card-body'>
                    <p className='card-title'>{e.JobTitle}</p>
                    <p>{e.JobDescription}</p>
                    <p style={{textAlign:'end'}}>Location:{e.Location}</p>
                    <p style={{textAlign:'end'}}>CTC:{e.Salary}</p>
                    <p style={{textAlign:'end'}}>DriveDate:{e.Date}</p>
                  </div>
                  <div className='card-footer'>
                    </div>
                </div>
        </div>
        ))}
        {cookie.get('Role')!='Recruiter' 
        &&<div className='Recomdedation'>
        </div>
}
        <h3>Coding Practice</h3>
        <div className='Coding'>
          <div className='card'>
            <div className='card-header'>
            <img src='data:image/jpeg;base64,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'></img>
            </div>
            <div className='card-body'>
              <p className='card-title'>LeetCode</p>
              <p>Sharpen your coding skills with the LeetCode Daily Challenge! Each day brings a new coding puzzle to solve, covering diverse topics and difficulty levels.</p>
            </div>
            <div className='card-footer'>
              <p>Link</p>
            </div>
            </div>
            <div className='card'>
            <div className='card-header'>
            <img src='data:image/png;base64,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'></img>
            </div>
            <div className='card-body'>
              <p className='card-title'>GeeksforGeeks</p>
              <p>GeeksforGeeks offers a robust practice platform designed to help users improve their coding skills through a variety of problems and exercises.</p>
            </div>
            <div className='card-footer'>
              <p>Link</p>
            </div>
          </div>
          <div className='card'>
            <div className='card-header'>
            <img src='data:image/jpeg;base64,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'></img>
            </div>
            <div className='card-body'>
              <p className='card-title'>CodeForces</p>
              <p>Codeforces is a competitive programming platform that hosts regular contests, where participants solve algorithmic and mathematical problems within a fixed time. </p>
            </div>
            <div className='card-footer'>
              <p>Link</p>
            </div>
          </div>
          <div className='card'>
            <div className='card-header'>
            <img src='data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAJQAxQMBIgACEQEDEQH/xAAcAAEBAAIDAQEAAAAAAAAAAAAAAQIHAwQGBQj/xABGEAABAwMCBAMEBQcICwAAAAABAAIDBAURBhIhMUFRBxNhImJxgRQVMpGSFiNCUlOhsSQzOFRyw9HwCBc0NUNFVXSys8H/xAAaAQEBAQEBAQEAAAAAAAAAAAAAAQMCBQQG/8QAIhEBAAICAgICAwEAAAAAAAAAAAERAgMSIQQFIjETUYFx/9oADAMBAAIRAxEAPwDTmEwsyi+mnFsNvophcgOOAUPNKLYqLLCmFKLTCYVwmEW2JTCyDVS0d0othhUcFcDumB3SpLRCrgJhSYlbYJlZkKYCnGVY5VyrtCbQlCZTKu0JgdwlSJlAnBUYSgKgQhRJ6GRKLFFBz4TguQv9xv3Jv91v3LemMOJFy7/dapv91qVCuLCYXJv91qeZ7rVKLcSya3PwWW/3WqF2emAlKjiOixVKikqEKYWRUXImE4qqIoosvioUEREUUUwqilKmEVVVoYp1VIQKTEomEVRWi3Zx3TAVdx4lYcltMM1IUwO4VUOFyIoqhCCY+CiY+KceyAVFVCFHQoiKSChCqIMUVwoVFERFFEyg54WXAKoxyivBOCUImVeCcEpbTKLIYUSkdnaR0U5cwuXy2/tWqeW39q1bSztxbz0Kbj1dhZ+W39oPuXotHWKG6VT56r26aAgFv67ux9Fhu246sJzy+oa6dWW7OMMfuXw6O33Cu/2OjnnHeOMkD5rsjT19P/Kqv8I/xW3omsjjAYAxjOQAwGrMTwfto/xheBn7rdfww6evHqtcR8s+2n/ybv2P9z1n4B/iupX2y4W5rHV9HNTh5wzzG43fBbvFRDn+ej/GF4nxSfHLTW4MkacSOJ2uBxwWnhe13+Rvx15YVEvn8jwterDlGVvA0dHU19UyloYJKmokOGRQtLnO+QX3LjoPVdsonVlZY6llOwZe9hZJtHchriQPXC2F4G08FLYtQXdjGvrYj5bCRxa0M3Y+ZP7l4CTX+qqiGqZNepXR1sTmSxua3Aa4YIbwy3nwwvcmZmaefUPjWi0XO+VX0W0UM9ZMACWxNztHdx5AfErvXzSGorBAJ7xaKimgJx5wLZGD4lpIHzW0NPTO0z4IzXWzbY62o3OfM1oJYS7bn5AK+Dl8uOpYL7ab/UvuFKIGuBnAJG7cC0nqDgfcueUlNVWLS981BFLLZrbLVshcGyOY5o2nGce0Qs7to/UdngNRc7LWQQN+1LsD2t+JaTj5rangqz6FYdVxQSH+T1MjY3jn7LMA/uXV8G9YX2/Xqe1XuqNwpZKYvPmsb+b+4Dgc44qcptaassdguuoZpYbLRSVkkTA94Y5o2g8uZCztmm7zdhVm226apNGSKgM25jI58zx5dMrbfhJRw2/xC1hRUuBBDtbGB0G4nH71PBaUQ3LV8xBxHUvcQ3nwc4qc5Kads9muV8rjRWmjfU1IaXmNpaCAOZ4kLgqKGqp699BJA/6YyTyzA0bn7/1QBzPwX6M09pqg/LKHV+nnxuttwppBNGzgGSEj2gOmcEEdCvNeGFvpajxQ1ZWzMDpqWTEOR9ne47iPXDR+9OQ11/q41kKUVH5P1WzGcbmb/wAG7d+5eXmjkhkfHNG6ORjtrmPaWlp7EHiFt7SldrDWF2uFXTaujtckVS6NlBNGDwyeAb6Dh3WstUUE9r1HcqGrqG1FRBUOEkoGA9x4k46c1ccpupHy0RF2giKjggxPNVUnKJQ7W0qFp/yU+SnyWzOjaf8AJWy9Bw+VpyFwGDLJI4+p3Fv8AFrP5LZmg5WyabgaOcUkjHfHcT/Aj715PuLnx+v29T1Ffn/j5GrjdLxqCOy2xkkrmRbmwRuwZDjJ4dSAOXovMV9lvFtcW3C3VtOQMnzI3AD4leq1fR3SgvtNfbQybzGbSJIWlzo3t9B0IXR1HrvVOpaL6HcpHspz9qOnp3MD/wC1zz8Fr4U6/wAOPGvrtj5kbI35cv2+BQ2y5XCQNt9HV1JPLymOcD8+SwutruFoqhTXSnlpqjYH+VLzDTyOOnJfd0trHUulo3w2oyGne7Jgmp3PYCeZb2XyL9crlerlNcruXmomIySwtAx0A7L6oq+qfLMTVvr6B1rVaMrp3sp21VFVACop3OwTjk5p5ZGTz5r0F21foF9DXfVWjZBX1kT4zJNsY2MuBBc0hzsEZzwAz6LHwl0VadX0d5N0bMJad0bYHxyluzcHccDnyC6umtCBviS3TWoo5HQiOR4dG4s81oGWuBCmXG5KcOg9ft09bJ7Je7f9Z2aoJ3R5G9meYweDge3TuvrVfiRY7LZam3aAsMttkq8iWpqCNzfUYc4k8TjJwOxyunT6RtEni5Ppl0cxtrHkBvmnd/Ntd9rnzJXHdtJ2ql8XINNQxyi2Plha5plJdhzA4+1z5qdWrk8MteWvSFruNFc6GrqRVy7vzGwjbtDcHc4L6R8T7BY6SePRGlhRVUzdrp5w1u3scNJLvhkL5viv4ejShbcLSyR1qeNrtzi50L+mSehXN4oaNs2mrBZqy1RTNmq3ASmSVzwRszwB5cVz0PneGmuKfSl1ulfdoausdWxgF0Ibku3EknJHfoufQuvKHTcl/dWUdZL9Zve+IQ7Dtzn7WSO/Rd7TOirNcfCy56iqo53XCCGpfG4TODQWA7fZ5HkvAWK2VF7vNFa6XPm1MoYCP0R1d8hkq1iPWeGviHNo+pqIayKaqtVQS8wxkb4n9HNBIHEYBGemenHoWzW1XZdcVmorVCXRVMrzJTTnHmRk52nGcHseP/xer8VPDe26fsEV0sAlIp5RHWtdKX8HYw7jywccPe9F43w90qdYahbbnTvgp2RmaaRo9oNBAwM9ST17FOu5HuKbxD0FTXg3+DS1wivL9xc+J7QwuPM43449Ttytaamun17qC4XVsBgFXMZfKLt20YHDPVbNrLH4Tw3Kos09bWUtZC4xPmklkDWvHA8+HP0wtTV7IIq6oipJHyU7JXNje/GXtB4E47pjVjg4qomVoidURFAREVHf8qTv/BQxSdwuPJ7qFasmTg5p9or0miL6y3VMtJWODKechwef0X8vuI4LzbX8NruLSpIzHPi08isd+nHdhOGTbTuy1ZxlDd8ZDmBwIIPrnPzXO0u7rS1BerlQDZS1s0TP1S7I+4rt/lbff6+78IX53Z6Tbfxy6e1HtteUfLHtuIF3crwviuT9FtvH/iu/8V5c6vv3/UH/AIQujdLzcbsI23CoMojOWbhgAlaeF6nd4+/HZlMTEf6+byfO17dc4xHbavgA5zLTqd7Dh7fKLT2Ox69T4d6it2uIaK41UcbL/a2lkm3gS1wwSOu088dCForT2qbvp2CritFSIWVYHnNLA7OAQOfLmV07Jd66w3GO4WmodBUxgt3Y4EEcQRyIXuzhc28220qP+kPVf2/7li4dQf0h6T/uKb/1Ba9Zqe7x6jfqFtSBcnnJm8sYJwG8vgAk+p7tUajZqGWdrroxzXNl2DALRgcOvBOMwW3xetU0A1vV6O1CyJ1suFLGInScAHuyC0n1wMHofkvPf6QMLafT1ihYSWx1BYCeeBGQtQX693DUFwNfdZxLU7Gs3gBuA3OOXx5rv3HVVzv7bZRahrjPQUszMnb7W3g1xyOJO3PqueFdrbaGh+PgPe8/1at/g5dDwLstPRwV+q7oWQwRAwwyyHDWt/Td/ALK+a00ZZ9AVundITzVLqtkkTWvilaGbz7TnOeB0JxjPHC1vLq+9SadZYPpbRa2DaImsDSRnPE9VIiZG99N01jnN7tbtTU93+u5HzPpxtBaXNw7bgnhgN+G1ak0vbdUaa19V0en4G1FwoWSCRkgw2aHhz+Ps4wea8harjU2i4QV9vl8mqgdujeAOa+tNrXUMt6+uRcXRV5YI3SxMDdzRyBHVXjI3faaga2qX0Wr9B/RpGxn+UzNa9o9A/Ac0n0Wh9X26ntGqLnbqJ5fTU1Q5kbnOycdifTK+5V+KmsaqmdTPugjaRgviha133rxj3ukkL5HFz3HLnOOSSrjFSSIiLpBERARUoqOyRgcFiqHY9e6EYWjhFk1/wCifsrDKin0Uye3b8FjlZNd+i7kh8v3lasYZPZMnsFl+b95T2feQYknsmT2WXs+8sSW+8oqE9wmQr7PvJ7PvKCZ7Kc+aywDxGfmsSVFQ8eaiIpKiIigqiIiiIiIIiIqooiqOc80Bx690PH0WK0cMtvvJtIaTlY5Tj3UDKiYRRRRXKiWqIiqliJyVzhYkoUoPZUgFYJkqLS7U2pkpkoJhMJkpkqWKphMplLh0YTHFNyhcrcJSoplAubVUREtKcrgW/BY5VDuGDyWJ4HgtLcLlMqLHKlqzypkrHJVSxcoSsVcJa0vEjgpg9kzjkm4/rJcFGCVdpwscnqVdydCckUJRSZWlRTKmVzZTLKZCx4oooSiIgIiICckQcUDKqYRBc8VQ4oi6hyu44U3FRF1CrkqIiSCdERQRTqqizEVREURVFRFDzREFRVEERVFyIeSgVRAQKougKIiD//Z'></img>
            </div>
            <div className='card-body'>
              <p className='card-title'>CodingNinja</p>
              <p>CodingNinja is a competitive programming platform that hosts regular contests, where participants solve algorithmic and mathematical problems within a fixed time. </p>
            </div>
            <div className='card-footer'>
              <p>Link</p>
            </div>
          </div>
        </div>
        {cookie.get('Role')!='Recruiter' &&
        <div className='Live_Session'>
          <h3>Weekly Session With Our Experts</h3>
          <div className='ses-card'>
            <div className='left'>
              <img src='https://talentsprint.com/misc/digi-pr/images/1.png'></img>
            </div>
            <div className='right'>
              <h4>Career Guidance Live Session</h4>
              <p>Time: 6:00 PM</p>
              <p>Join us for an exclusive live session on career guidance! Whether you're a student, recent graduate, or seasoned professional, this session is designed to provide you with the tools and insights you need to succeed in your career.</p>
              <p className='meet-link'>Link</p>
            </div>
          </div>
        
        </div>
}

    </div>
    </>
  )
}

export default Home