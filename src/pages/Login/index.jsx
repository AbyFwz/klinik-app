import React, { useState } from "react";
// components
import Logo from "../../assets/logo-transparent.png";
import Footer from "../../layouts/Footer";
import LoginForm from "../../components/LoginForm";

export default function Login() {
  return (
    <>
      <div className="h-screen p-5 bg-gradient-to-b from-white to-sky-100">
        <img className="w-32 h-auto" alt="dentology" src={Logo} />
        <div className="mt-56">
          <LoginForm />
        </div>
        <Footer />
      </div>
    </>
  );
}
