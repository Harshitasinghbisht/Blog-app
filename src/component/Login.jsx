import { useState } from 'react';
import React from "react";
import authService from '../appwrite/auth'
import { useNavigate,Link } from 'react-router-dom';
import {Button , Input ,Logo} from './index'
import { useDispatch } from 'react-redux';
import {useForm} from "react-hook-form"
import { login as authLogin} from '../store/authSlice';


function Login(){
    const dispatch=useDispatch()
    const navigate=useNavigate()
    const {register,handleSubmit}=useForm()
    const [error,setError]= useState("")

    const login =async (data) => {
        setError("")
        try {
          const session=await authService.login(data); 
          if(session){
            const userData=await authService.getCurrentUser()
           // console.log(userData);
            
            if(userData)dispatch(authLogin({ 
    $id: userData.$id,
    name: userData.name,
    email: userData.email 
}));
            navigate("/")
          } 
        } catch (error) {
            setError(error.message)
        }
    }
return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 via-blue-100 to-slate-200 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 transition-colors duration-500 px-4">
      <div
        className={`w-full max-w-md bg-white/70 dark:bg-gray-700/40 backdrop-blur-md rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 p-8 transition-all duration-300`}
      >
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <span className="inline-block w-24">
            <Logo width="100%" />
          </span>
        </div>

        {/* Heading */}
        <h2 className="text-center text-2xl font-bold text-gray-800 dark:text-gray-100">
          Sign in to your account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
          Don&apos;t have an account?{" "}
          <Link
            to="/signup"
            className="font-medium text-blue-600 dark:text-blue-400 hover:underline"
          >
            Sign up
          </Link>
        </p>

        {/* Error Message */}
        {error && (
          <p className="text-red-500 text-center mt-6 font-medium">{error}</p>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit(login)} className="mt-8 space-y-5">
          <Input
            label="Email :"
            type="email"
            placeholder="Enter your email"
            {...register("email", {
              required: true,
              validate: {
                matchPattern: (value) =>
                  /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                  "Email address must be valid",
              },
            })}
          />

          <Input
            label="Password :"
            type="password"
            placeholder="Enter your password"
            {...register("password", { required: true })}
          />

          <Button
            type="submit"
            className="w-full py-3 mt-2 bg-gradient-to-r from-blue-600 to-slate-800 text-white font-semibold rounded-xl shadow-md hover:shadow-lg hover:scale-[1.02] transform transition-all duration-300"
          >
            Sign in
          </Button>
        </form>
      </div>
    </div>
  );
}

export default Login