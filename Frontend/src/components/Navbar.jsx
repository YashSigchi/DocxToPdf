import React from "react";

function Navbar({ darkMode }) {
  return (
    <div
      className={`w-screen px-6 py-3 md:px-40 shadow-lg h-16 fixed transition-all duration-500 ${
        darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"
      }`}
    >
      <div className="flex justify-between">
        <h1 className="text-2xl cursor-pointer font-bold">
          Word<span className="text-3xl text-green-500">To</span>PDF
        </h1>
        <h1 className="mt-1 text-2xl cursor-pointer font-bold hover:scale-125 duration-300">Home</h1>
      </div>
    </div>
  );
}

export default Navbar;
