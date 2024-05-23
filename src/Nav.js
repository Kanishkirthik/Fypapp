import React, { useState } from 'react'
import { Cookies } from 'react-cookie'
import p from './profile.png'
import { Link ,useNavigate} from 'react-router-dom'
function Nav() {
  const cookies=new Cookies()
  let user=cookies.get('UserId')
  let navigate=useNavigate()
  const [hide,sethide]=useState();
  if (window.innerWidth<988){
    sethide(true)
  }

  return (
    <div className='nav'>
      <ul className='nav-ul'>
       {!hide &&  <p className='logo' onClick={()=>{
          navigate('/')
        }}>FYP</p>
      }
        <li className='li-nav'>
            About
        </li>
        {cookies.get('Role')!='Recruiter'&& <li className='li-nav' >
           <div className='dropdown'>
            Jobs
            <div className='drop-items'>
                <button>Senior Software Developer</button>
                <button>Junior Software Developer</button>
                <button>Web Developer</button>
            </div>
           </div>
        </li>
}{cookies.get('Role')!='Recruiter'&& 
        <li className='li-nav'>
        <div className='dropdown'>
            Compaines
            <div className='drop-items'>
                <button>Top Products</button>
                <button>Top services</button>
                <button>Top AI</button>
            </div>
            </div>
        </li>
}
{ !user ?<li className='li-nav'>
        <a className='login_sig' onClick={()=>{
          navigate('/login')
        }}>login/Signup</a>
        </li>:<li className='li-nav'>
          <div className='Profile'>
            <img className='pro_fic' src={p} ></img>
            <div className='drop'>
              <ul>
                <li>{cookies.get('name')}</li>
                <li>{cookies.get('Role')}</li>
                <Link to={'/DashBoard'}><li> Go to DashBoard</li></Link>
                <li onClick={()=>{
                  cookies.remove('UserId');
                  cookies.remove('Role');
                  cookies.remove('name');
                  cookies.remove('Authentication_Token');
                  navigate('/')
                }}>Log Out</li>
              </ul>
            </div>
          </div>
          
        </li>
}
      </ul>

    </div>
  )
}

export default Nav
