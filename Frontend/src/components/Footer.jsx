import React from "react";

function Footer({ darkMode }) {
  return (
    <div
      className={`flex items-center justify-center border-t transition-all duration-500 ${
        darkMode ? "border-gray-500 bg-gray-800 text-white" : "border-black bg-white text-gray-900"
      }`}
    >
      <h1 className="text-center py-3 text-sm">
        Copyright © 2024 - All rights reserved by Yash Sigchi
      </h1>
    </div>
  );
}

export default Footer;
