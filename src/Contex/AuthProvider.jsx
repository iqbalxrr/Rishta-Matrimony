
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import React, { createContext, useEffect, useState } from "react";
import auth from "../Firebase/firebase.config";
import { toast, Bounce } from "react-toastify";

export const AuthContext = createContext({})


const AuthProvider = ({ children }) => {
   

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const SuccessTost = (message) => {
    return toast.success(message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      
      transition: Bounce,
    });
  };

  const ErrorTost = (message) => {
    return toast.error(message, {
      position: "top-right",
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      
      transition: Bounce,
    });
  };

  const CreateUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const UpdateUserProfile = (profile) => {
    return updateProfile(auth.currentUser, profile);
  };

  const LoginUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const LogOut = () => {
    setLoading(true);
    return signOut(auth);
  };

  const SigninWithGoogle = (provider) => {
    setLoading(true);
    return signInWithPopup(auth, provider);
  };

  const PasswordReset = (email) => {
    setLoading(true);
    return sendPasswordResetEmail(auth, email);
  };


  


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      // console.log(currentUser);
      setUser(currentUser);
      setLoading(false);
     
    });

    return () => unsubscribe();
  }, []);

  const info = {
    user,
    setUser,
    CreateUser,
    LoginUser,
    LogOut,
    SigninWithGoogle,
    UpdateUserProfile,
    SuccessTost,
    ErrorTost,
    loading,
    setLoading,
    PasswordReset,
    

  };

  // console.log(user);

  return <AuthContext.Provider value={info}>{children}</AuthContext.Provider>;
};

export default AuthProvider;