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
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../Axios Instance/axios";

// Create context
export const AuthContext = createContext({});

const imgbbApiKey =  import.meta.env.VITE_IMGBB_API_KEY;

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🖼️ Image Upload State
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [uploading, setUploading] = useState(false);

  // 🔄 Upload Image Function
  const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append("image", file);
    setUploading(true);

    try {
      const res = await fetch(`https://api.imgbb.com/1/upload?key=${imgbbApiKey}`, {
        method: "POST",
        body: formData,
      });
      const data = await res.json();

      if (data.success) {
        const url = data.data.display_url;
        setUploadedImageUrl(url);
        SuccessTost("Image uploaded successfully!");
        return url;
      } else {
        ErrorTost("Image upload failed");
        return "";
      }
    } catch (error) {
      console.error("Image upload error:", error);
      ErrorTost("Upload error");
      return "";
    } finally {
      setUploading(false);
    }
  };

  // ✅ Toast
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

  // ✅ Firebase Auth Methods
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
    if (currentUser) {
      setUser(currentUser);
    } else {
      setUser(null);
    }
    setLoading(false);
  });

  return () => unsubscribe();
}, []);

// manage role Authuser data section 

  const { data: authUser = {},  } = useQuery({
    queryKey: ["authUser",user?.email],
    enabled: !! user?.email,
    queryFn: async () => {
      const res = await axiosInstance.get(`/authusers?email=${user?.email}`);
      return res.data;
    },
  });

  // console.log(authUser)

  // my biodata section 
  
  // ✅ Fetch biodata using email
    const { data: biodata ,isLoading , isError } = useQuery({
      queryKey: ['biodata', user?.email],
      queryFn: async () => {
        const res = await axiosInstance.get(`/biodata?email=${user?.email}`);
        return res.data.data;
      },
      enabled: !!user?.email,
    });

  // console.log(biodata)
  // console.log(biodata?.profileImage)
  // console.log(biodata?.email)

  useEffect(() => {
  if (
    authUser?.isPremium &&
    biodata?.email 
    
  ) {
    axiosInstance
      .post("all-premium-members", biodata)
      .then(() => {
        // console.log("Premium member posted");
      })
      .catch((err) => {
        if (err.response?.status !== 409) {
          // console.error("Failed to post premium member:", err);
        }
      });
  }
}, [authUser?.isPremium, biodata]);

  // ✅ All values provided to children
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

    // 🖼️ Image upload values
    uploadedImageUrl,
    uploadImage,
    uploading,
   
    // user role manage section 

    authUser,

    //my biodata value 

    biodata ,
    isLoading,
    isError

  };

  return <AuthContext.Provider value={info}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
