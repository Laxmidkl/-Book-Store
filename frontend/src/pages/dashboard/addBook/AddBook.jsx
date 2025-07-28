import React, { useState } from "react";
import InputField from "./InputField";
import SelectField from "./SelectField";
import { useForm } from "react-hook-form";
import { useAddBookMutation } from "../../../redux/features/books/booksApi";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const AddBook = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const [imageFile, setImageFile] = useState(null);
  const [addBook, { isLoading, isError }] = useAddBookMutation();
  const [imageFileName, setImageFileName] = useState("");
  const [useImageUrl, setUseImageUrl] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    console.log("Form data submitted:", data);

    const newBookData = {
      ...data,
      coverImage: useImageUrl ? data.coverImage : imageFileName,
      oldPrice: Number(data.oldPrice),
      newPrice: Number(data.newPrice),
      trending: data.trending || false,
    };

    try {
      await addBook(newBookData).unwrap();
      Swal.fire({
        title: "Book added",
        text: "Your book is uploaded successfully!",
        icon: "success",
        confirmButtonText: "OK",
      });

      navigate("/dashboard/manage-books");
      reset();
      setImageFileName("");
      setImageFile(null);
      setUseImageUrl(false);
    } catch (error) {
      console.error(error);
      Swal.fire({
        title: "Error",
        text: "Failed to add book. Please try again.",
        icon: "error",
      });
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImageFileName(file.name);
      setUseImageUrl(false); // Switch back to file upload mode
    }
  };

  const toggleImageInput = () => {
    setUseImageUrl(!useImageUrl);
    setImageFile(null);
    setImageFileName("");
  };

  return (
    <div className="max-w-lg mx-auto md:p-6 p-3 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Add New Book</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="">
        <InputField
          label="Title"
          name="title"
          placeholder="Enter book title"
          register={register}
          required
        />

        <InputField
          label="Author"
          name="author"
          placeholder="Enter author's name"
          register={register}
          required
        />

        <InputField
          label="Description"
          name="description"
          placeholder="Enter book description"
          type="textarea"
          register={register}
          required
        />

        <SelectField
          label="Category"
          name="category"
          options={[
            { value: "", label: "Choose A Category" },
            { value: "business", label: "Business" },
            { value: "technology", label: "Technology" },
            { value: "fiction", label: "Fiction" },
            { value: "adventure", label: "Adventure" },
          ]}
          register={register}
          required
        />

        <div className="mb-4">
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              {...register("trending")}
              className="rounded text-blue-600 focus:ring focus:ring-offset-2 focus:ring-blue-500"
            />
            <span className="ml-2 text-sm font-semibold text-gray-700">
              Trending
            </span>
          </label>
        </div>

        <InputField
          label="Old Price"
          name="oldPrice"
          type="number"
          placeholder="Old Price"
          register={register}
          required
        />

        <InputField
          label="New Price"
          name="newPrice"
          type="number"
          placeholder="New Price"
          register={register}
          required
        />

        {/* Image Input Section */}
        <div className="mb-4">
          {/* <div className="flex items-center mb-2">
            <label className="inline-flex items-center mr-4">
              <input
                type="radio"
                checked={!useImageUrl}
                onChange={toggleImageInput}
                className="text-blue-600 focus:ring-blue-500"
              />
              <span className="ml-2 text-sm font-semibold text-gray-700">
                Upload Image
              </span>
            </label>
            <label className="inline-flex items-center">
              <input
                // type="radio"
                checked={useImageUrl}
                onChange={toggleImageInput}
                className="text-blue-600 focus:ring-blue-500"
              />
              <span className="ml-2 text-sm font-semibold text-gray-700">
                Use Image URL
              </span>
            </label>
          </div> */}

          {useImageUrl ? (
            <InputField
              label="Cover Image URL"
              name="coverImage"
              type="text"
              placeholder="https://example.com/image.jpg"
              register={register}
            />
          ) : (
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Cover Image
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="mb-2 w-full"
              />
              {/* {imageFileName && (
                <p className="text-sm text-gray-500">Selected: {imageFileName}</p>
              )} */}
            </div>
          )}
        </div>

        <button
          type="submit"
          className="w-full py-2 bg-green-500 text-white font-bold rounded-md hover:bg-green-600 transition"
          disabled={isLoading}
        >
          {isLoading ? "Adding..." : "Add Book"}
        </button>
      </form>
    </div>
  );
};

export default AddBook;
