import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Toast, { toastOptions } from "../components/Toast.js";
import { useNavigate } from "react-router-dom";

const axios = require("axios").default;

function Login() {
  const [userCredentials, setUserCredentials] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  function handleChange(event) {
    const targetName = event.target.name;
    const newValue = event.target.value;
    // console.log(targetName);
    // console.log(newValue);
    setUserCredentials((prevCredentials) => {
      return {
        ...prevCredentials,
        [targetName]: newValue,
      };
    });
  }

  function handleSubmit(event) {
    event.preventDefault();

    // validate user credentials ie non empty and valid email/password format and password policy

    async function loginUser() {
      try {
        const response = await axios.post(
          "https://auth-system-prac-server.herokuapp.com/login",
          userCredentials
        );
        console.log(response);
        if (response.data.token) {
          // console.log(response.data.token);
          console.log(response.data.message);
          // store token in the browser
          localStorage.setItem("token", response.data.token);
          // redirect
          navigate("/posts");
        } else {
          console.log("We are unable to login the user");
          toast.error("We are unable to login the user", toastOptions);
        }
      } catch (error) {
        console.log(error);
        toast.error(error.response.data, toastOptions);
      }
    }

    loginUser();
  }

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <input
          onChange={handleChange}
          name="email"
          type="email"
          value={userCredentials.email}
        />
        <input
          onChange={handleChange}
          name="password"
          type="text"
          value={userCredentials.password}
        />
        <button type="submit">Login</button>
      </form>
      <Toast />
    </div>
  );
}

export default Login;
