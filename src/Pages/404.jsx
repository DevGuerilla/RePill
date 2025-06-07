import React from "react";
import { useNavigate } from "react-router";
  import AuthButton from "../Components/Elements/Buttons/AuthButton";

const NotFound = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate(-1);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-50">
      <div className="text-center px-4 max-w-3xl">
        <div className="mb-8">
          <img
            src="/src/assets/img/404.svg"
            alt="404 Not Found"
            className="w-96 h-96 md:w-[300px] md:h-[300px] lg:w-[400px] lg:h-[400px] xl:w-[500px] xl:h-[500px] mx-auto"
          />
        </div>
        <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold text-slate-800 mb-4">
          Halaman Tidak Ditemukan
        </h1>
        <p className="text-slate-600 mb-2 text-base md:text-lg">
          Maaf, halaman yang Anda cari tidak ada atau telah dipindahkan.
        </p>
        <p className="text-slate-500 mb-8 text-sm md:text-base">
          Silakan periksa kembali URL atau kembali ke halaman utama.
        </p>
        <div className="max-w-xs mx-auto">
          <AuthButton onClick={handleGoHome} fullWidth={true}>
            Kembali ke Halaman Sebelumnya
          </AuthButton>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
