import React, { useState } from "react";
const axios = require("axios").default;

function ForgotPassword() {
  const [email, setEmail] = useState("");

  function handleChange(event) {
    const newEmail = event.target.value;
    setEmail(newEmail);
  }

  function handleClick() {
    async function sendOTP() {
      try {
        const response = await axios.post("http://localhost:4000/otp", {
          email: email,
        });
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    }

    sendOTP();
  }

  return (
    <div>
      <label for="email">Email </label>
      <input
        name="email"
        type="email"
        placeholder="john@gmail.com"
        value={email}
        onChange={handleChange}
      ></input>
      <button type="submit" onClick={handleClick}>
        Send OTP
      </button>
    </div>
  );
}

export default ForgotPassword;
