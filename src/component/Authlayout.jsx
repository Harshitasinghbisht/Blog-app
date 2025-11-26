import { useState,useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";


export default function Protected({children ,authentication=true}){
const navigate=useNavigate();
const [loader,setLoader]=useState("true")

const authSatus=useSelector(state=>state.auth.status)

useEffect(()=>{
   // we can make it more easy this if else statement
   //authstatus false
    if(authentication && authSatus!==authentication){
      navigate('/login')
    }
    //authstatus true
    else if(!authentication && authSatus!==authentication){
     navigate('/')
    }
    setLoader(false)
},[authSatus,authentication,navigate])

    return loader?<h1>....loading</h1>:<>{children}</>
}