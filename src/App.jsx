import { useState,useEffect } from 'react'
import {login,logout} from './store/authSlice'
import {useDispatch, useSelector} from 'react-redux'
import authService from './appwrite/auth'
import {Header,Footer} from './component'
import { Outlet } from 'react-router-dom'



function App() {
 
  const [loading,setLoading]=useState(true);
  const dispatch = useDispatch()

  const theme=useSelector((state=>state.theme.theme))

  useEffect(()=>{
   document.documentElement.classList.remove("light","dark")
    document.documentElement.classList.add(theme)
  
  },[theme])

  useEffect(()=>{
    authService.getCurrentUser()
    .then((userData)=>{
      if(userData){
     dispatch(login({userData}))
    }
    else{
      dispatch(logout())
    }
    })
    .finally(()=>setLoading(false))
  },[])
  return !loading ?(
    <div className='min-h-screen bg-gray-50 dark:bg-slate-900 text-gray-900 dark:text-gray-100'>
        <div className='w-full block'>
        <Header/>
        <main>
        <Outlet/>
        </main>
        <Footer/>
        </div>
    </div>
  ):null
}

export default App
