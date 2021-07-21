import React from 'react';
import { NavLink } from 'react-router-dom';
import './NavBar.css'

const NavBar = () => {
  return (
    <div>  
        <div className="navegador">
          <ul>  
            <div className="logo-conteiner">   
             <img src={process.env.PUBLIC_URL + `/img/logo.png`} className="logo"></img>
            </div>   
             <li> <NavLink exact to="/home"> All games </NavLink></li>
       
             <li ><div className="line1"></div> <NavLink exact to="/create"> Create </NavLink></li> 
              
             <li><div className="line2"></div> <NavLink exact to="/create"> About </NavLink></li> 
          </ul>
        </div>

    </div>
  )
}

export default NavBar
