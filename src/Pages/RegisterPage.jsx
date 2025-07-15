import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { Link } from 'react-router';
import { FcGoogle } from 'react-icons/fc';
import { FaFileUpload, FaEye, FaEyeSlash } from 'react-icons/fa';

const imgbbAPIKey = '7db0214d63f2739a9721e7a5fe4ffd7a';

const RegisterPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm();
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const photoFileList = watch('photo');

  useEffect(() => {
    if (photoFileList && photoFileList.length > 0) {
      setImagePreview(URL.createObjectURL(photoFileList[0]));
    } else {
      setImagePreview(null);
    }
  }, [photoFileList]);

  const onSubmit = async (data) => {
    if (!data.photo[0]) {
      setSubmitError('Photo is required');
      return;
    }

    setLoading(true);
    setSubmitError('');

    try {
      const formData = new FormData();
      formData.append('image', data.photo[0]);

      const response = await axios.post(
        `https://api.imgbb.com/1/upload?key=${imgbbAPIKey}`,
        formData,
        { headers: { 'Content-Type': 'multipart/form-data' } }
      );

      if (!response.data.success) {
        throw new Error('Image upload failed');
      }

      const photoURL = response.data.data.url;

      console.log('Registering:', {
        name: data.name,
        email: data.email,
        password: data.password,
        photoURL,
      });

      reset();
      setImagePreview(null);
    } catch (error) {
      setSubmitError(error.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    console.log('Google Sign-Up');
  };

  return (
    <div className="min-h-screen pt-40 flex items-center justify-center px-4 py-10 sm:px-6 lg:px-8 ">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white w-full max-w-md p-6 sm:p-8 rounded-xl shadow-lg"
      >
        <h2 className="text-2xl sm:text-3xl font-semibold mb-6 text-center subtitle-font text-rose-600">
          Create  Account
        </h2>

        {submitError && <p className="text-red-500 text-sm mb-4 text-center">{submitError}</p>}

        <input
          type="text"
          placeholder="Full Name"
          className={`w-full p-3 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-rose-300
            ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
          {...register('name', { required: 'Full Name is required' })}
        />
        {errors.name && <p className="text-red-500 text-xs mb-2">{errors.name.message}</p>}

        <input
          type="email"
          placeholder="Email"
          className={`w-full p-3 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-rose-300
            ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
          {...register('email', {
            required: 'Email is required',
            pattern: {
              value: /^\S+@\S+$/i,
              message: 'Invalid email address',
            },
          })}
        />
        {errors.email && <p className="text-red-500 text-xs mb-2">{errors.email.message}</p>}

        {/* Password Field with Show/Hide Icon */}
        <div className="relative mb-4">
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
            className={`w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-rose-300
              ${errors.password ? 'border-red-500' : 'border-gray-300'}`}
            {...register('password', {
              required: 'Password is required',
              minLength: {
                value: 6,
                message: 'Password must be at least 6 characters',
              },
            })}
          />
          <span
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500"
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>
        {errors.password && (
          <p className="text-red-500 text-xs mb-2">{errors.password.message}</p>
        )}

        {/* File Input */}
        <div className="mb-4">
          <label
            htmlFor="photo-upload"
            className={`cursor-pointer overflow-hidden flex items-center justify-center border border-gray-300 rounded p-3 text-gray-700 hover:border-rose-500
              ${errors.photo ? 'border-red-500 text-red-500' : ''}`}
          >
            <FaFileUpload className="mr-2" size={20}  />
            {photoFileList && photoFileList.length > 0
              ? `Uploaded: ${photoFileList[0].name}`
              :  ` Choose Profile Photo`}
          </label>
          <input
            id="photo-upload"
            type="file"
            accept="image/*"
            className="hidden"
            {...register('photo', { required: true })}
          />
          {errors.photo && <p className="text-red-500 text-xs mt-1">Photo is required</p>}
        </div>

        {/* Image Preview */}
        {imagePreview && (
          <div className="mb-4 text-center">
            <img
              src={imagePreview}
              alt="Preview"
              className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover mx-auto border-2 border-rose-400"
            />
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-rose-600 hover:bg-rose-700 text-white py-2 rounded transition duration-300 text-sm sm:text-base"
        >
          {loading ? 'Registering...' : 'Register'}
        </button>

        <div className="flex items-center my-4">
          <div className="flex-grow h-px bg-gray-300"></div>
          <span className="mx-2 text-gray-500 text-sm">or</span>
          <div className="flex-grow h-px bg-gray-300"></div>
        </div>

        <button
          type="button"
          onClick={handleGoogleLogin}
          className="w-full flex items-center justify-center gap-2 bg-white border border-gray-300 hover:shadow-md text-gray-700 py-2 rounded transition duration-300 text-sm sm:text-base"
        >
          <FcGoogle size={22} /> Sign up with Google
        </button>

        <p className="text-sm text-center mt-4">
          Already have an account?{' '}
          <Link to="/loginpage" className="text-rose-600 font-medium hover:underline">
            Login here
          </Link>
        </p>
      </form>
    </div>
  );
};

export default RegisterPage;
