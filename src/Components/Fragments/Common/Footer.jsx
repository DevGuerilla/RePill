import React from "react";
import { Link } from "react-router";

const Footer = () => {
  return (
    <footer className="bg-white border-t">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="md:flex md:items-center md:justify-between">
          <div className="flex justify-center md:justify-start">
            <Link to="/" className="text-green-600 font-bold text-xl">
              SAPA
            </Link>
          </div>
          <div className="mt-4 md:mt-0">
            <p className="text-center text-xs text-gray-500">
              &copy; {new Date().getFullYear()} SAPA. All rights reserved.
            </p>
          </div>
          <div className="mt-4 md:mt-0 flex space-x-6 justify-center md:justify-end">
            <Link
              to="/terms"
              className="text-xs text-gray-500 hover:text-gray-700"
            >
              Terms & Conditions
            </Link>
            <Link
              to="/privacy"
              className="text-xs text-gray-500 hover:text-gray-700"
            >
              Privacy Policy
            </Link>
            <Link
              to="/contact"
              className="text-xs text-gray-500 hover:text-gray-700"
            >
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
