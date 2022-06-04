import React from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  function handleClick(event) {
    const targetName = event.target.name;
    navigate("/" + targetName);
  }

  return (
    <div>
      <button onClick={handleClick} name="register">
        Register
      </button>
      <button onClick={handleClick} name="login">
        Login
      </button>
      <button onClick={handleClick} name="">
        Home
      </button>
      <button onClick={handleClick} name="posts">
        Posts
      </button>
      <button onClick={handleClick} name="forgot-password">
        Forgot password ?
      </button>
    </div>
  );
}

export default Home;
