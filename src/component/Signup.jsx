import React from "react";
import authService from "../appwrite/auth";
import {Link,useNavigate} from 'react-router-dom';
import { useDispatch } from "react-redux";
import {Logo,Input,Button} from './index'
import { useForm } from "react-hook-form";
import { useState } from "react";

function Signup(){
    const dispatch=useDispatch();
    const [error,setError]=useState("");
    const navigate=useNavigate()
    const {register,handleSubmit}=useForm()

    const create=async (data) => {
        setError("")
       try {
        const userData= authService.createAccount(data)
        if(userData){
         const userData= await authService.getCurrentUser()
          if(userData)dispatch(login(userData))
            navigate('/')
        }
       } catch (error) {
        setError(error.message)
       }
    }
     return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-slate-100 to-gray-200 dark:from-gray-900 dark:via-slate-800 dark:to-gray-900 transition-colors duration-500">
      <div
        className={`mx-auto w-full max-w-lg bg-gray-100 dark:bg-slate-700/40 rounded-xl p-10 shadow-md border border-black/10`}
      >
        <div className="mb-4 flex justify-center">
          <span className="inline-block w-full max-w-[100px]">
            <Logo width="100%" />
          </span>
        </div>

        <h2 className="text-center text-2xl font-bold leading-tight text-gray-800 dark:text-gray-100">
          Sign up to create an account
        </h2>

        <p className="mt-2 text-center text-base text-gray-600 dark:text-gray-300">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-medium text-blue-600 hover:text-blue-500 transition-all duration-200"
          >
            Sign in
          </Link>
        </p>

        {error && (
          <p className="text-red-500 text-center mt-6 font-medium">{error}</p>
        )}

        <form onSubmit={handleSubmit(create)} className="mt-8 space-y-5">
          <Input
            lable="Full Name:"
            placeholder="Enter your full name"
            {...register("name", { required: true })}
          />

          <Input
            lable="Email:"
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
            lable="Password:"
            type="password"
            placeholder="Enter your password"
            {...register("password", { required: true })}
          />

          <Button
            type="submit"
            className="w-full mt-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-md transition-all duration-300"
          >
            Create Account
          </Button>
        </form>
      </div>
    </div>
  );
}

export default Signup