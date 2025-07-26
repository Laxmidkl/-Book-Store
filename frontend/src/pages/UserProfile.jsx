
import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/firebase.config";

const UserProfile = () => {
  const { currentUser, updateUserProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue
  } = useForm();

  // Get user initials (matches Navbar logic)
  const getUserInitials = (user) => {
    if (!user) return "";
    const name = user.fullName || user.email || "";
    const parts = name.trim().split(" ");
    if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
    return parts[0].charAt(0).toUpperCase() + parts[parts.length - 1].charAt(0).toUpperCase();
  };

  useEffect(() => {
    if (currentUser) {
      const loadUserData = async () => {
        try {
          const userDoc = await getDoc(doc(db, "users", currentUser.uid));
          if (userDoc.exists()) {
            reset({
              fullName: userDoc.data().fullName || currentUser.fullName || "",
              phone: userDoc.data().phone || "",
              address: userDoc.data().address || "",
            });
          } else {
            reset({
              fullName: currentUser.fullName || "",
              phone: "",
              address: "",
            });
          }
        } catch (err) {
          console.error("Error loading user data:", err);
        } finally {
          setLoading(false);
        }
      };

      loadUserData();
    }
  }, [currentUser, reset]);

  const onSubmit = async (data) => {
    setError("");
    setSuccess("");
    try {
      await updateUserProfile(currentUser.uid, {
        fullName: data.fullName,
        phone: data.phone,
        address: data.address,
      });
      
      setSuccess("Profile updated successfully!");
      setIsEditing(false);
      
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError("Failed to update profile. Please try again.");
      console.error(err);
    }
  };

  useEffect(() => {
    if (isEditing && currentUser) {
      setValue("fullName", currentUser.fullName || "");
      setValue("phone", currentUser.phone || "");
      setValue("address", currentUser.address || "");
    }
  }, [isEditing, currentUser, setValue]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!currentUser) {
    navigate("/login");
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="bg-blue-600 px-6 py-8 text-center">
            <div className="mx-auto h-24 w-24 rounded-full bg-white flex items-center justify-center text-3xl font-bold text-blue-600 mb-4">
              {getUserInitials(currentUser)}
            </div>
            <h1 className="text-2xl font-bold text-white">
              {currentUser.fullName || currentUser.email}
            </h1>
            <p className="text-blue-100">{currentUser.email}</p>
          </div>

          <div className="px-6 py-8">
            {error && (
              <div className="mb-4 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                <p>{error}</p>
              </div>
            )}

            {success && (
              <div className="mb-4 bg-green-100 border-l-4 border-green-500 text-green-700 p-4">
                <p>{success}</p>
              </div>
            )}

            {isEditing ? (
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="grid grid-cols-1 gap-6">
                  <div>
                    <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="fullName"
                      {...register("fullName", { required: "Full name is required" })}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                    {errors.fullName && (
                      <p className="mt-1 text-sm text-red-600">{errors.fullName.message}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={currentUser.email}
                      disabled
                      className="mt-1 block w-full bg-gray-100 border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      {...register("phone", {
                        required: "Phone number is required",
                        pattern: {
                          value: /^[0-9]{10,15}$/,
                          message: "Please enter a valid phone number"
                        }
                      })}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                    {errors.phone && (
                      <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                      Address
                    </label>
                    <textarea
                      id="address"
                      rows={3}
                      {...register("address", { required: "Address is required" })}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                    {errors.address && (
                      <p className="mt-1 text-sm text-red-600">{errors.address.message}</p>
                    )}
                  </div>

                  <div className="flex justify-end space-x-4">
                    <button
                      type="button"
                      onClick={() => setIsEditing(false)}
                      className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      Save Changes
                    </button>
                  </div>
                </div>
              </form>
            ) : (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">Profile Information</h3>
                  <div className="mt-4 border-t border-gray-200 pt-4">
                    <dl className="divide-y divide-gray-200">
                      <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4">
                        <dt className="text-sm font-medium text-gray-500">Full name</dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                          {currentUser.fullName || "Not provided"}
                        </dd>
                      </div>
                      <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4">
                        <dt className="text-sm font-medium text-gray-500">Email address</dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                          {currentUser.email}
                        </dd>
                      </div>
                      <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4">
                        <dt className="text-sm font-medium text-gray-500">Phone number</dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                          {currentUser.phone || "Not provided"}
                        </dd>
                      </div>
                      <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4">
                        <dt className="text-sm font-medium text-gray-500">Address</dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                          {currentUser.address || "Not provided"}
                        </dd>
                      </div>
                    </dl>
                  </div>
                </div>

                <div className="flex justify-end">
                  <button
                    onClick={() => setIsEditing(true)}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Edit Profile
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;