import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, signInWithGoogle, logInWithEmailAndPassword } from "./firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import "./Login.css";
import "./styles/title.css";
import GoogleIcon from "@mui/icons-material/Google";
import NoteAltIcon from "@mui/icons-material/NoteAlt";

import Cookies from "js-cookie";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();

  const handleLogin = () => {
    // Generate a unique session ID
    const sessionId =
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15);
    // Store the session ID in a cookie with an expiration time of 3 days
    Cookies.set("sessionId", sessionId, { expires: 3 });
  };
  useEffect(() => {
    if (loading) {
      // maybe trigger a loading screen
      return;
    }
    if (user) navigate("/dashboard");
  }, [user, loading]);
  return (
    <div className='login'>
      <div className='block'>
        <div className='title'>
          <header>
            <NoteAltIcon fontSize='large' />
            Todo App
          </header>
        </div>
        <div className='login__container'>
          <h2>Login</h2>
          <input
            type='text'
            className='login__textBox'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder='E-mail Address'
          />
          <input
            type='password'
            className='login__textBox'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder='Password'
          />
          <button
            className='login__btn'
            onClick={() => {
              logInWithEmailAndPassword(email, password);
              handleLogin();
            }}
          >
            Login
          </button>
          <button
            className='login__btn login__google'
            onClick={() => {
              signInWithGoogle();
              handleLogin();
            }}
          >
            <GoogleIcon /> Login with Google
          </button>
          <div>
            <Link to='/reset'>Forgot Password</Link>
          </div>
          <div>
            Don't have an account? <Link to='/register'>Register</Link> now.
          </div>
        </div>
      </div>
    </div>
  );
}
export default Login;
