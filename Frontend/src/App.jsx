import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Footer from "./components/Footer";

function App() {
  // Load dark mode preference from localStorage
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("darkMode") === "true";
  });

  // Update dark mode in localStorage & apply class
  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  return (
    <div className={darkMode ? "dark bg-gray-900 text-white" : "bg-gray-100 text-gray-900"}>
      <Navbar darkMode={darkMode} />
      <Home darkMode={darkMode} setDarkMode={setDarkMode} />
      <Footer darkMode={darkMode} />
    </div>
  );
}

export default App;
