import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import getBaseUrl from "../utils/baseURL";
import PasswordInput from '../pages/PasswordInput';

// import jwtDecode from 'jwt-decode';

import { jwtDecode } from "jwt-decode";

const AdminLogin = () => {
  const [message, setMessage] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  // Redirect if already logged in as admin
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        if (decoded?.role === "admin") {
          navigate("/"); // Redirect to home or admin dashboard
        }
      } catch (err) {
        localStorage.removeItem("token");
      }
    }
  }, [navigate]);

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        `${getBaseUrl()}/api/auth/admin`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const auth = response.data;

      //  Make sure the logged-in user is an admin
      if (auth.user?.role !== "admin") {
        setMessage("You are not authorized as admin.");
        return;
      }

      //  Save token to localStorage
      if (auth.token) {
        localStorage.setItem("token", auth.token);

        setTimeout(() => {
          localStorage.removeItem("token");
          alert("Token expired! Please login again.");
          navigate("/admin");
        }, 3600 * 1000);

        alert("Admin login successful!");
        navigate("/");
      }
    } catch (error) {
      console.error(error);
      setMessage("Please provide a valid email and password");
    }
  };

  return (
    <div className="h-screen flex justify-center items-center">
      <div className="w-full max-w-sm mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h2 className="text-xl font-semibold mb-4">Admin Dashboard Login</h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              {...register("email", { required: true })}
              type="email"
              name="email"
              id="email"
              placeholder="email"
              className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow"
            />
            {errors.email && (
              <p className="text-red-500 text-xs italic">Email is required</p>
            )}
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
        <PasswordInput register={register} name="password" placeholder="Password" />
             
            
            {errors.password && (
              <p className="text-red-500 text-xs italic">
                Password is required
              </p>
            )}
          </div>

          {message && (
            <p className="text-red-500 text-xs italic mb-3">{message}</p>
          )}

          <div className="w-full">
            <button
              type="submit"
              className="bg-blue-500 w-full hover:bg-blue-700 text-white font-bold py-2 px-8 rounded focus:outline-none"
            >
              Login
            </button>
          </div>
        </form>

        <p className="mt-5 text-center text-gray-500 text-xs">
          ©2025 Book Store. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default AdminLogin;
