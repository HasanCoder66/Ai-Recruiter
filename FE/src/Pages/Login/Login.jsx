// import React, { useState } from "react";
// import { Google } from "@mui/icons-material";
// import { Alert, Box, Button, Paper, Snackbar, Typography } from "@mui/material";
// import axios from "axios";
// import { initializeApp } from "firebase/app";
// import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { BASE_URL_PROD } from "../../constants/baseUrl";
// import { login } from "../../redux/Slices/authSlices";
// // ✅ Firebase Config from environment
// const firebaseConfig = {
//   apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
//   authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
//   projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
//   appId: import.meta.env.VITE_FIREBASE_APP_ID,
// };

// // ✅ Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const auth = getAuth(app);

// const Login = () => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const user = useSelector((state) => state.auth.user);

//   // 🔐 If already logged in, redirect to dashboard
//   useEffect(() => {
//     if (user) {
//       navigate("/dashboard");
//     }
//   }, [user, navigate]);

//   const handleGoogleLogin = async () => {
//     const provider = new GoogleAuthProvider();
//     try {
//       const result = await signInWithPopup(auth, provider);
//       const user = result?.user;

//       const userData = {
//         name: user?.displayName,
//         email: user?.email,
//         avatar: user?.photoURL,
//         uid: user?.uid,
//       };

//       // ✅ Send to backend and dispatch to Redux
//       await axios.post(`${BASE_URL_PROD}/auth/google`, userData);
//       dispatch(login(userData));
//       navigate("/dashboard");
//     } catch (err) {
//       console.error("Google Sign-in Error:", err.message);
//     }
//   };

//     const handleToastClose = () => {
//     setToast({ ...toast, open: false });
//   };

//   const [toast, setToast] = useState({
//     open: false,
//     message: "",
//     severity: "success", // success | error | warning | info
//   });
//   return (
//     <>
//       <Box className="min-h-screen flex items-center justify-center bg-gradient-to-r from-sky-50 to-indigo-100 p-4">
//         <Paper
//           elevation={6}
//           className="w-full max-w-4xl flex flex-col md:flex-row overflow-hidden rounded-2xl shadow-lg"
//         >
//           {/* Left Image Section */}
//           <Box className="w-full md:w-1/2 bg-indigo-100 flex items-center justify-center p-6">
//             <img
//               src="https://res.cloudinary.com/dpvxkqhi8/image/upload/v1752565586/ai-login_j3kjuq.webp"
//               alt="AI Interview Illustration"
//               className="max-h-72 object-contain"
//             />
//           </Box>

//           {/* Right Login Box */}
//           <Box className="w-full md:w-1/2 p-8 space-y-6 flex flex-col justify-center">
//             <div>
//               <Typography
//                 variant="h4"
//                 fontWeight="bold"
//                 gutterBottom
//                 fontSize={32}
//               >
//                 Welcome to AI Recruiter
//               </Typography>
//               <Typography variant="body1" color="text.secondary">
//                 Sign in with Google to continue
//               </Typography>
//             </div>

//             <Button
//               variant="contained"
//               startIcon={<Google />}
//               onClick={handleGoogleLogin}
//               fullWidth
//               size="large"
//               sx={{
//                 textTransform: "none",
//                 backgroundColor: "#6851ff",
//                 "&:hover": { backgroundColor: "#6111ff" },
//                 fontWeight: 600,
//               }}
//             >
//               Sign in with Google
//             </Button>
//           </Box>
//         </Paper>
//       </Box>

//       {/* Toast Snackbar */}
//       <Snackbar
//         open={toast.open}
//         autoHideDuration={4000}
//         onClose={handleToastClose}
//         anchorOrigin={{ vertical: "top", horizontal: "right" }}
//         // sx={{ top: "250", right: 0 }}
//       >
//         <Alert
//           onClose={handleToastClose}
//           severity={toast.severity}
//           variant="filled"
//           sx={{ width: "100%" }}
//         >
//           {toast.message}
//         </Alert>
//       </Snackbar>
//     </>
//   );
// };

// export default Login;

import React, { useEffect, useState } from "react";
import {
  Alert,
  Box,
  Button,
  Paper,
  Snackbar,
  Typography,
  CircularProgress,
} from "@mui/material";
import { Google } from "@mui/icons-material";
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL_PROD } from "../../constants/baseUrl";
import { login } from "../../redux/Slices/authSlices";

// ✅ Firebase Config
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

// ✅ Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({
    open: false,
    message: "",
    severity: "success", // success | error
  });

  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  const handleToastClose = () => {
    setToast({ ...toast, open: false });
  };

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      setLoading(true);
      const result = await signInWithPopup(auth, provider);
      const user = result?.user;

      const userData = {
        name: user?.displayName,
        email: user?.email,
        avatar: user?.photoURL,
        uid: user?.uid, // 👈 This is the Firebase UID (important)
      };

      // api call
      await axios.post(`${BASE_URL_PROD}/auth/google`, userData);

      dispatch(login(userData));
      setToast({
        open: true,
        message: "Login successful ✅",
        severity: "success",
      });

      setTimeout(() => {
        navigate("/dashboard");
      }, 3000);
    } catch (err) {
      console.error("Google Sign-in Error:", err.message);
      setToast({
        open: true,
        message: "Login failed ❌",
        severity: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Box className="min-h-screen flex items-center justify-center bg-gradient-to-r from-sky-50 to-indigo-100 p-4">
        <Paper
          elevation={6}
          className="w-full max-w-4xl flex flex-col md:flex-row overflow-hidden rounded-2xl shadow-lg"
        >
          {/* Left Illustration */}
          <Box className="w-full md:w-1/2 bg-indigo-100 flex items-center justify-center p-6">
            <img
              src="https://res.cloudinary.com/dpvxkqhi8/image/upload/v1752565586/ai-login_j3kjuq.webp"
              alt="AI Login Illustration"
              className="max-h-72 object-contain"
            />
          </Box>

          {/* Right Login Section */}
          <Box className="w-full md:w-1/2 p-8 space-y-6 flex flex-col justify-center">
            <div>
              <Typography
                variant="h4"
                fontWeight="bold"
                gutterBottom
                fontSize={32}
              >
                Welcome to AI Recruiter
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Sign in with Google to continue
              </Typography>
            </div>

            <Button
              variant="contained"
              startIcon={
                loading ? (
                  <CircularProgress color="inherit" size={20} />
                ) : (
                  <Google />
                )
              }
              onClick={handleGoogleLogin}
              disabled={loading}
              fullWidth
              size="large"
              sx={{
                textTransform: "none",
                backgroundColor: "#6851ff",
                "&:hover": { backgroundColor: "#6111ff" },
                fontWeight: 600,
              }}
            >
              {loading ? "Signing in..." : "Sign in with Google"}
            </Button>
          </Box>
        </Paper>
      </Box>

      {/* Snackbar Toast */}
      <Snackbar
        open={toast.open}
        autoHideDuration={4000}
        onClose={handleToastClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={handleToastClose}
          severity={toast.severity}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {toast.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default Login;
