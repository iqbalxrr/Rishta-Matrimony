import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router';
import { FcGoogle } from 'react-icons/fc';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { GoogleAuthProvider } from 'firebase/auth';
import { useContext } from 'react';
import { AuthContext } from '../Contex/AuthProvider';
import Swal from 'sweetalert2';


const provider = new GoogleAuthProvider();

const LoginPage = () => {

  const navigate = useNavigate();

   const {
    SigninWithGoogle,
    setUser,
    LoginUser,

  } = useContext(AuthContext);


  const { register, handleSubmit, formState: { errors } } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);
    setLoginError('');

    const {email , password} = data;

    try {
      LoginUser(email, password)
      .then((result) => {
        setUser(result.user);
        Swal.fire({
          title: "Login Sucessfully!",
          icon: "success",
          draggable: true,
        });
        navigate(location.state? location.state : "/" );
      })
      .catch((error) => {
        // setErrorMessage(error.message);
        Swal.fire({
          title: `${error.message}`,
          icon: "error",
          draggable: true,
        });
      });
      console.log('Logging in:', data);
    } catch (error) {
      setLoginError('Login failed. Please check your credentials.');
      console.log(error)
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = () => {
   SigninWithGoogle(provider)
         .then((result) => {
           setUser(result.user);
           console.log(result.user);
           Swal.fire({
             title: "Login Sucessfully!",
             icon: "success",
             draggable: true,
           });
   
           navigate("/");
         })
         .catch((error) => {
           console.log(error.message);
         });
  };

  return (
    <div className="min-h-screen  flex items-center justify-center px-4 py-10 sm:px-6 lg:px-8 ">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white w-full max-w-md p-6 sm:p-8 rounded-xl shadow-lg"
      >
        <h2 className="text-2xl sm:text-3xl subtitle-font font-semibold mb-6 text-center text-rose-600">
          Welcome Back
        </h2>

        {loginError && <p className="text-red-500 text-sm mb-4 text-center">{loginError}</p>}

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

        <div className="relative mb-4">
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
            className={`w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-rose-300
              ${errors.password ? 'border-red-500' : 'border-gray-300'}`}
            {...register('password', { required: 'Password is required' })}
          />
          <span
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500"
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>
        {errors.password && <p className="text-red-500 text-xs mb-2">{errors.password.message}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-rose-600 hover:bg-rose-700 text-white py-2 rounded transition duration-300 text-sm sm:text-base"
        >
          {loading ? 'Logging in...' : 'Login'}
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
          <FcGoogle size={22} /> Login with Google
        </button>

        <p className="text-sm text-center mt-4">
          Don't have an account?{' '}
          <Link to="/registerpage" className="text-rose-600 font-medium hover:underline">
            Register here
          </Link>
        </p>
      </form>
    </div>
  );
};

export default LoginPage;
