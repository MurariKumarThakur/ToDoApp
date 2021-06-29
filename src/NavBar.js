import React from 'react'
import './Navbar.css'
import {Link} from 'react-router-dom'
import {db,auth} from './firebase'
import {useHistory} from 'react-router-dom'
const NavBar = ({user}) => {
const history= useHistory();
  const signOut=()=>{
     auth.signOut();
     history.push('/login')
  }
  return (
    <div className='navbar'>

      <div className="logo">
       <Link to='/home'>
       <i className="fas fa-list-ol"/>
       {" "}

        My Task Tracker
       </Link>
     

      </div>
     
       
       {
       user ?
       <>
       <span>{user.email}</span>
       <button onClick={signOut} className="signOut">
        
       Logout
     </button></> :
       
     <Link  to='/login'>
    <div className="signin">
      <button> Login</button>
     
       </div>
      </Link>
      }
     
      
     
      
    </div>
  )
}

export default NavBar
