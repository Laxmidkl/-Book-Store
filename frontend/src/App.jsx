import { useState } from "react";
import "./App.css";
import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import TopSellers from "./pages/home/TopSeller";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <>
      <AuthProvider>
        <Navbar />
        <main
          className="min-h-screen max-w-screen-2xl mx-auto mt-24 "
        >
          <Outlet  />
        </main>
        <Footer />
      </AuthProvider>
    </>
  );
}

export default App;
