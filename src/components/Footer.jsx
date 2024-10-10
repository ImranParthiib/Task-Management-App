import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-blue-800 to-purple-800 text-white py-6">
      <div className="container mx-auto px-4 text-center">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} Task Master. All rights reserved.
        </p>
        <p className="text-xs mt-2 text-blue-200">
          Designed with ❤️ for productivity
        </p>
      </div>
    </footer>
  );
};

export default Footer;
