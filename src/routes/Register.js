import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Toast, { toastOptions } from "../components/Toast.js";
import { useNavigate } from "react-router-dom";

const axios = require("axios").default;

function Register() {
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

    async function registerUser() {
      try {
        const response = await axios.post(
          "http://localhost:4000/register",
          userCredentials
        );

        console.log(response);
        toast.success(response.data, toastOptions);
      } catch (error) {
        console.log(error.response.data);
        toast.error(error.response.data, toastOptions);
      }
    }

    registerUser();
  }

  return (
    <div>
      <h1>Register</h1>
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
        <button type="submit">Register</button>
        <Toast />
      </form>
    </div>
  );
}

export default Register;
