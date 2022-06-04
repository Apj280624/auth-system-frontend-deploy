import React from "react";
import { BrowserRouter, Routes, Route, HashRouter } from "react-router-dom";

import Home from "./routes/Home";
import Register from "./routes/Register";
import Login from "./routes/Login";
import Posts from "./routes/Posts";
import ForgotPassword from "./routes/ForgorPassword";

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/posts" element={<Posts />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
