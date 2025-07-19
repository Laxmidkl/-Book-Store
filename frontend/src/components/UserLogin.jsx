import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { useAuth } from '../context/AuthContext';
import PasswordInput from '../pages/PasswordInput';

const UserLogin = () => {
  const [message, setMessage] = useState("");
  const { loginUser, signInWithGoogle } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    try {
      await loginUser(data.email, data.password);
      alert("Login successful!");
      navigate(from, { replace: true });
    } catch (error) {
      setMessage("Please provide a valid email and password");
    }
  };

  return (
    <div className='h-screen flex justify-center items-center'>
      <form onSubmit={handleSubmit(onSubmit)} className='bg-white p-8 rounded shadow-md w-full max-w-sm'>
        <h2 className='text-xl mb-4 font-bold'>User Login</h2>
        <input {...register("email", { required: true })} type="email" placeholder='Email' className='mb-4 w-full border p-2 rounded' />
        <PasswordInput register={register} name="password" placeholder="Password" />
        {message && <p className="text-red-500 text-sm mt-2">{message}</p>}
        <button className="mt-4 w-full bg-blue-500 text-white py-2 rounded">Login</button>
      </form>
    </div>
  );
};

export default UserLogin;