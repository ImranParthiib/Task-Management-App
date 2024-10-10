// src/components/Header.jsx
import React from "react";

const Header = () => {
  return (
    <header className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-6 shadow-lg">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl md:text-4xl font-bold text-center">Task Master</h1>
        <p className="text-xl text-center mt-2 text-blue-100">Organize your day, achieve your goals</p>
      </div>
    </header>
  );
};

export default Header;
