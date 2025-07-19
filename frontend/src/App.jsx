import { useState } from "react";
import "./App.css";
import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import TopSellers from "./pages/home/TopSeller";
import { AuthProvide } from "./context/AuthContext";

function App() {
  return (
    <>
      <AuthProvide>
        <Navbar />
        <main
          className="min-h-screen max-w-screen-2xl mx-auto "
        >
          <Outlet />
        </main>
        <Footer />
      </AuthProvide>
    </>
  );
}

export default App;
