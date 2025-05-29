import React from "react";
import { Link } from "react-router";
import { useSelector } from "react-redux";
import { selectIsAuthenticated } from "../Redux/Features/Auth/AuthStore";
import Navbar from "../Components/Fragments/Common/Navbar";
import Footer from "../Components/Fragments/Common/Footer";

const Home = () => {
  const isAuthenticated = useSelector(selectIsAuthenticated);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow flex flex-col items-center justify-center bg-gray-50 py-16">
        <h1 className="text-4xl font-bold text-primary mb-4">
          Selamat Datang di SAPA
        </h1>
        <p className="text-lg text-gray-600 mb-8 max-w-xl text-center">
          Platform yang menghubungkan sekolah, siswa, dan orang tua dalam satu
          sistem terintegrasi.
        </p>

        {!isAuthenticated && (
          <div className="space-x-4">
            <Link
              to="/masuk"
              className="bg-primary hover:bg-primary-hover text-white px-6 py-3 rounded-md font-medium transition-transform duration-300 ease-in-out transform hover:scale-105 active:scale-95"
            >
              Masuk Sekarang
            </Link>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Home;
