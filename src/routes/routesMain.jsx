import React from "react";
import { NativeRouter, Route, Routes } from "react-router-native";
import Home from "../pages/home";
import Login from "../components/login";
import RegisterForm from "../components/register";

const RoutesMain = () => {
  return (
    <NativeRouter>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </NativeRouter>
  );
};

export default RoutesMain;
