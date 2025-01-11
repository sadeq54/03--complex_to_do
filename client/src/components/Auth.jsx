import { use } from "react";
import { useState } from "react";
import {useCookies} from "react-cookie";

export default function Auth() {
  const [isLogIn, setIsLogIn] = useState(true);
  const [error, setError] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);

  // using cookies to store the email and the tokens
  const [Cookie, setCookie , removeCookie] = useCookies(null)
  const viewBage = (status) => {
    setError(null);
    setIsLogIn(status);
  };
  const handelsubmit = async (e, endpoint) => {
  
    e.preventDefault();
    if (!isLogIn && password !== confirmPassword) {
      setError("Password do not match");
    }

    const response = await fetch(
      `${import.meta.env.VITE_REACT_APP_BASE_URL}/${endpoint}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      }
    );
    const data = await response.json();
    if (data.detail) {
        setError(data.detail);
      }
      else{
        console.log(data.token)
        setCookie("Email",data.email)
        setCookie("AuthToken", data.token)
        window.location.reload();
      }
  };
  
  return (
    <>
      <div className="auth-container">
        <div className="auth-container-box">
          <form action="">
            <h2>{isLogIn ? "Please Log In" : "Please Sign Up"}</h2>
            <input
              type="email"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            {!isLogIn && (
              <input
                type="password"
                placeholder="Confirm Password"
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                }}
              />
            )}
            <input
              type="submit"
              className="create"
              onClick={(e) => handelsubmit(e, isLogIn ? "login" : "signup")}
            />
            {error && <p>{error}</p>}
          </form>
          <div className="auth-options">
            <button
              style={{
                backgroundColor: isLogIn ? "white" : "rgb(188,188,188)",
              }}
              onClick={() => viewBage(false)}
            >
              Sign Up
            </button>

            <button
              style={{
                backgroundColor: isLogIn ? "rgb(188,188,188)" : "white",
              }}
              onClick={() => viewBage(true)}
            >
              Log In
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
