import React from "react";
import { useDispatch } from "react-redux";
import authService from "../../appwrite/auth";
import { logout } from "../../store/authSlice";

export default function LogoutBtn(){

    const dispatch= useDispatch()
   const logoutHandler = async () => {
    try {
      await authService.logout();   // logs out from Appwrite
      dispatch(logout());           // updates Redux state
      console.log("User logged out successfully");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };
    return(
        <button
    className='inline-block px-4 md:px-6 py-2 rounded-full text-sm md:text-base font-medium hover:bg-white/10 transition-colors duration-300'
    onClick={logoutHandler}
    >Logout</button>
    )
}