import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import InputText from "./InputText";

import { fetchUserLogIn, loginData } from "../store/Login";  // Import loginData action
import { apiRequest } from "../service/allservice";


export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Accessing Redux state
  const logusername = useSelector((state) => state.login.username);
  const logpassword = useSelector((state) => state.login.password);

  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const [handleEffect, setHandleEffect] = useState({
    username: false,
    password: false,
  });

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [correct, isCorrect] = useState(false);

  const effectHandler = (name) => {
    if (name === "password" && credentials.password === "") {
      setHandleEffect({ ...handleEffect, password: true });
    }
  };

  const inputHandler = (name, value) => {
    setCredentials({ ...credentials, [name]: value });
  };

  const loginHandler = async (e) => {
    e.preventDefault();
    let isValid = true;
  
    if (credentials.password === "") {
      setHandleEffect((prev) => ({ ...prev, password: true }));
      isValid = false;
    }
  
    if (isValid && !handleEffect.username && !handleEffect.password) {
      try {
        const data = {
          username: credentials.username,
          password: credentials.password,
        };

        let url = `/api/auth/login`;
        const { success, data: finaldata } = await apiRequest({
          method: "POST",
          url,
          body: data,
        });

        if (success) {
          async function setData() {
            localStorage.setItem("loggedIn", finaldata.encodedToken);
            localStorage.setItem("user", JSON.stringify(finaldata.foundUser));
            const data=localStorage.getItem('loggedIn')
            console.log(data)
            // Dispatch the user data (including user ID) to Redux store                        
            dispatch(fetchUserLogIn(finaldata.foundUser._id))  // Pass user object directly, not wrapped
          }

          await setData();
          navigate("/home");
        } else {
          console.log("Invalid credentials");
          isCorrect(true);
        }
      } catch (error) {
        console.error("Login error:", error);
      }
    }
  };

  // UseEffect to log state updates after dispatch
  useEffect(() => {
    console.log("Updated Username (Redux state):", logusername);
    console.log("Updated Password (Redux state):", logpassword);
  }, [logusername, logpassword]);

  return (
    <div className="flex justify-center min-h-screen items-center bg-gray-50">
      <div className="flex flex-col w-full max-w-md p-6 bg-white shadow-xl rounded-lg">
        <form onSubmit={loginHandler} className="flex flex-col gap-y-5">
          <h2 className="text-2xl font-semibold text-center text-gray-800">
            Sign In
          </h2>
          <InputText
            type="text"
            name="username"
            placeholder="Username"
            onFocus={() => setHandleEffect((prev) => ({ ...prev, username: false }))}
            value={credentials.username}
            onChange={(e) => inputHandler("username", e.target.value)}
            onBlur={() => effectHandler("username")}
            error={handleEffect.username}
            errorName="username"
          />
          <InputText
            type={passwordVisible ? "text" : "password"}
            placeholder="Password"
            onFocus={() => setHandleEffect((prev) => ({ ...prev, password: false }))}
            value={credentials.password}
            onChange={(e) => inputHandler("password", e.target.value)}
            onBlur={() => effectHandler("password")}
            error={handleEffect.password}
            errorName="password"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white py-3 w-full rounded-lg font-semibold"
          >
            Login
          </button>
          {correct && (
            <p className="text-xs text-red-500 flex items-center justify-center mt-2">
              Invalid credentials
            </p>
          )}
        </form>
      </div>
    </div>
  );
}
