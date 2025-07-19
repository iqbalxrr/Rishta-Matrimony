import React, { useState, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router';
import { FcGoogle } from 'react-icons/fc';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { GoogleAuthProvider } from 'firebase/auth';
import { AuthContext } from '../Contex/AuthProvider';
import Swal from 'sweetalert2';
import axiosInstance from '../Axios Instance/axios';

const provider = new GoogleAuthProvider();

const RegisterPage = () => {
  const navigate = useNavigate();

  const { CreateUser, SigninWithGoogle, setUser, UpdateUserProfile } =
    useContext(AuthContext);

  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    setSubmitError('');

    const { name, email, password } = data;

    try {
      const userCredential = await CreateUser(email, password);
      await UpdateUserProfile({
        displayName: name,
      });

      const userInfo = {
        name,
        email,
        role: "user"
      }

      await axiosInstance.post('/users', userInfo);

      Swal.fire({
        title: 'Signup Successfully!',
        icon: 'success',
        draggable: true,
      });

      navigate('/');
      reset();
    } catch (error) {
      setSubmitError(error.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    SigninWithGoogle(provider)
      .then(async (result) => {
        const googleUser = result.user;
        setUser(googleUser);

        const userInfo = {
          name: googleUser.displayName,
          email: googleUser.email,
          role: 'user',
        };

        try {
          await axiosInstance.post('/users', userInfo);
          Swal.fire({
            title: 'Signup Successfully!',
            icon: 'success',
            draggable: true,
          });
          navigate('/');
        } catch (error) {
          console.error('Failed to save user to DB:', error.message);
        }
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <div className="min-h-screen pt-40 flex items-center justify-center px-4 py-10 sm:px-6 lg:px-8">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white w-full max-w-md p-6 sm:p-8 rounded-xl shadow-lg"
      >
        <h2 className="text-2xl sm:text-3xl font-semibold mb-6 text-center subtitle-font text-rose-600">
          Create Account
        </h2>

        {submitError && (
          <p className="text-red-500 text-sm mb-4 text-center">{submitError}</p>
        )}

        <input
          type="text"
          placeholder="Full Name"
          className={`w-full p-3 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-rose-300 ${errors.name ? 'border-red-500' : 'border-gray-300'
            }`}
          {...register('name', { required: 'Full Name is required' })}
        />
        {errors.name && (
          <p className="text-red-500 text-xs mb-2">{errors.name.message}</p>
        )}

        <input
          type="email"
          placeholder="Email"
          className={`w-full p-3 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-rose-300 ${errors.email ? 'border-red-500' : 'border-gray-300'
            }`}
          {...register('email', {
            required: 'Email is required',
            pattern: {
              value: /^\S+@\S+$/i,
              message: 'Invalid email address',
            },
          })}
        />
        {errors.email && (
          <p className="text-red-500 text-xs mb-2">{errors.email.message}</p>
        )}

        <div className="relative mb-4">
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
            className={`w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-rose-300 ${errors.password ? 'border-red-500' : 'border-gray-300'
              }`}
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
