import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaGoogle, FaEye, FaEyeSlash } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";

const Register = () => {
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { registerUser, signInWithGoogle } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });

  const onSubmit = async (data) => {
    try {
      const fullName = `${data.firstName} ${data.lastName}`;

      await registerUser(
        data.email,
        data.password,
        fullName,
        data.phone,
        data.address
      );

      alert("User registered successfully!");
      navigate("/");
    } catch (error) {
      setMessage(error.message || "Registration failed. Please try again.");
      console.error(error);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
      alert("Registration successful!");
      navigate("/");
    } catch (error) {
      setMessage(error.message || "Google sign in failed!");
      console.error(error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md mx-auto bg-white shadow-lg rounded-lg px-8 pt-6 pb-8 mb-4">
        <h2 className="text-2xl font-bold text-center mb-6">
          Create Your Account
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="firstName"
              >
                First Name
              </label>
              <input
                {...register("firstName", {
                  required: "First name is required",
                  minLength: {
                    value: 2,
                    message: "First name must be at least 2 characters",
                  },
                })}
                type="text"
                id="firstName"
                placeholder="First Name"
                className={`shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow ${
                  errors.firstName ? "border-red-500" : ""
                }`}
              />
              {errors.firstName && (
                <p className="text-red-500 text-xs italic mt-1">
                  {errors.firstName.message}
                </p>
              )}
            </div>

            <div>
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="lastName"
              >
                Last Name
              </label>
              <input
                {...register("lastName", {
                  required: "Last name is required",
                  minLength: {
                    value: 2,
                    message: "Last name must be at least 2 characters",
                  },
                })}
                type="text"
                id="lastName"
                placeholder="Last Name"
                className={`shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow ${
                  errors.lastName ? "border-red-500" : ""
                }`}
              />
              {errors.lastName && (
                <p className="text-red-500 text-xs italic mt-1">
                  {errors.lastName.message}
                </p>
              )}
            </div>
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z][a-zA-Z0-9._-]*@[a-zA-Z]+\.[a-zA-Z]{2,}$/,
                  message:
                    "Please enter a valid email address (name@domain.com)",
                },
                validate: {
                  startsWithLetter: (value) =>
                    /^[a-zA-Z]/.test(value) || "Email must start with a letter",
                  noNumbersInDomain: (value) => {
                    const domain = value.split("@")[1]?.split(".")[0];
                    return (
                      !/\d/.test(domain) || "Domain name cannot contain numbers"
                    );
                  },
                  validTld: (value) =>
                    /\.(com|org|net|edu|gov|co|io|me|info|biz|[a-z]{2,})$/.test(
                      value.toLowerCase()
                    ) || "Invalid domain extension",
                  noConsecutiveSpecial: (value) =>
                    !/[._-]{2,}/.test(value.split("@")[0]) ||
                    "Cannot have consecutive special characters",
                },
              })}
              type="email"
              id="email"
              placeholder="name@domain.com"
              className={`shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow ${
                errors.email ? "border-red-500" : ""
              }`}
            />
            {errors.email && (
              <p className="text-red-500 text-xs italic mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="relative">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters",
                },
                // pattern: {
                // value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                // message: "Must contain uppercase, lowercase, number and special character"
                // }
              })}
              type={showPassword ? "text" : "password"}
              id="password"
              placeholder="Password (min 8 characters)"
              className={`shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow ${
                errors.password ? "border-red-500" : ""
              }`}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-9 text-gray-500 focus:outline-none"
            >
              {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
            </button>
            {errors.password && (
              <p className="text-red-500 text-xs italic mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <div>
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="phone"
            >
              Phone Number
            </label>
            <input
              {...register("phone", {
                required: "Phone number is required",
                pattern: {
                  value: /^[0-9]{10}$/,
                  message: "Please enter a 10-digit phone number",
                },
              })}
              type="tel"
              id="phone"
              placeholder="Phone Number"
              className={`shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow ${
                errors.phone ? "border-red-500" : ""
              }`}
            />
            {errors.phone && (
              <p className="text-red-500 text-xs italic mt-1">
                {errors.phone.message}
              </p>
            )}
          </div>

          <div>
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="address"
            >
              Address
            </label>
            <textarea
              {...register("address", {
                required: "Address is required",
                minLength: {
                  value: 2,
                  message: "Address must be at least 2 characters",
                },
              })}
              id="address"
              placeholder="Your complete address"
              className={`shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow ${
                errors.address ? "border-red-500" : ""
              }`}
            />
            {errors.address && (
              <p className="text-red-500 text-xs italic mt-1">
                {errors.address.message}
              </p>
            )}
          </div>

          {message && (
            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-3 rounded">
              <p>{message}</p>
            </div>
          )}

          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-8 rounded focus:outline-none focus:shadow-outline w-full transition duration-200"
            >
              Register
            </button>
          </div>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              Login here
            </Link>
          </p>
        </div>

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">
                Or continue with
              </span>
            </div>
          </div>

          <div className="mt-4">
            <button
              onClick={handleGoogleSignIn}
              className="w-full flex items-center justify-center gap-2 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium py-2 px-4 rounded focus:outline-none transition duration-200"
            >
              <FaGoogle className="text-red-500" />
              Sign up with Google
            </button>
          </div>
        </div>

        <p className="mt-8 text-center text-gray-500 text-xs">
          ©{new Date().getFullYear()} Book Store. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Register;
