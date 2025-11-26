import React from "react"
import {useSelector} from 'react-redux'
import { useNavigate} from 'react-router-dom'
import { Link } from "react-router-dom"
import {Container,Logo,LogoutBtn} from '../index'
import ToggleTheme from "../ToggleTheme"

function Header() {
 const authStatus=useSelector((state)=>state.auth.status)
 const navigate=useNavigate() 

 const navItem=[
  {
    name:'Home',
    slug:"/",
    active:true
  },
  {
    name:'Login',
    slug:"/login",
    active: !authStatus
  },
  {
    name:'Signup',
    slug:"/signup",
    active: !authStatus
  },
    {
    name:'All Post',
    slug:"/all-post",
    active: authStatus
  },
   {
    name:'Add Post',
    slug:"/add-post",
    active: authStatus
  },
  
 ]
 return (
    <header className="w-full bg-gradient-to-r from-blue-600 to-slate-800 text-white shadow-md sticky top-0 z-50 transition-all duration-300">
      <Container>
        <nav className="flex items-center justify-between px-4 md:px-6 py-3">
          {/* Logo Section */}
          <div className="flex items-center gap-3">
            <Link to="/" className="flex items-center gap-2 hover:opacity-90 transition-opacity">
              <Logo width="70px" />
              <span className="hidden sm:inline text-xl font-semibold tracking-wide">
                DevBlog
              </span>
            </Link>
          </div>

          {/* Navigation Buttons */}
          <ul className="flex items-center gap-2 md:gap-4 ml-auto">
            {navItem.map(
              (item) =>
                item.active && (
                  <li key={item.name}>
                    <button
                      onClick={() => navigate(item.slug)}
                      className="inline-block px-4 md:px-6 py-2 rounded-full text-sm md:text-base font-medium hover:bg-white/10 transition-colors duration-300"
                    >
                      {item.name}
                    </button>
                  </li>
                )
            )}
           
            {authStatus && (
              <li>
                <LogoutBtn />
              </li>
            )}
             <li>
             <ToggleTheme/>
            </li>
          </ul>
        </nav>
      </Container>
    </header>
  );
}

export default Header