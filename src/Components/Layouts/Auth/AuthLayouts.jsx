import React, { useState } from "react";
import { Link } from "react-router";
import TermsModal from "../../Fragments/Common/TermsModal";
import PrivacyModal from "../../Fragments/Common/PrivacyModal";

const AuthLayout = ({ children, title, subtitle }) => {
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);

  const handleTermsClick = (e) => {
    e.preventDefault();
    setShowTermsModal(true);
  };

  const handlePrivacyClick = (e) => {
    e.preventDefault();
    setShowPrivacyModal(true);
  };

  return (
    <>
      <div className="h-screen flex flex-col md:flex-row overflow-hidden">
        <div className="hidden md:flex md:w-[50%] lg:w-[50%] xl:w-[50%] relative flex-col justify-center px-6 md:px-12 lg:px-16 xl:px-20 2xl:px-24 py-8 bg-gradient-to-br from-[#0ea5e9] via-[#0284c7] to-[#0369a1] text-white overflow-hidden">
          <div className="z-10 text-left ml-4 lg:ml-8 xl:ml-12">
            <div className="flex items-center mb-3 lg:mb-4 xl:mb-6">
              <img
                src="/src/assets/img/repill.png"
                alt="RePill Logo"
                className=" lg:w-32 lg:h-auto xl:w-36 xl:h-auto 2xl:w-52 2xl:h-auto mr-3 lg:mr-4"
              />
            </div>
            <p className="font-semibold max-w-lg xl:max-w-xl text-base lg:text-lg xl:text-xl 2xl:text-2xl mb-4 lg:mb-6 xl:mb-8 leading-relaxed text-blue-50">
              Sistem Manajemen Stok Obat Cerdas untuk Puskesmas
            </p>
            <div className="space-y-3 lg:space-y-4 xl:space-y-5 max-w-xl xl:max-w-2xl">
              <div className="flex items-center space-x-4 xl:space-x-5">
                <div className="w-3 h-3 xl:w-4 xl:h-4 bg-white rounded-full shadow-sm"></div>
                <p className="text-sm lg:text-base xl:text-lg font-medium text-blue-50">
                  Monitoring stok real-time
                </p>
              </div>
              <div className="flex items-center space-x-4 xl:space-x-5">
                <div className="w-3 h-3 xl:w-4 xl:h-4 bg-white rounded-full shadow-sm"></div>
                <p className="text-sm lg:text-base xl:text-lg font-medium text-blue-50">
                  Prediksi kebutuhan obat
                </p>
              </div>
              <div className="flex items-center space-x-4 xl:space-x-5">
                <div className="w-3 h-3 xl:w-4 xl:h-4 bg-white rounded-full shadow-sm"></div>
                <p className="text-sm lg:text-base xl:text-lg font-medium text-blue-50">
                  Notifikasi stok menipis
                </p>
              </div>
              <div className="flex items-center space-x-4 xl:space-x-5">
                <div className="w-3 h-3 xl:w-4 xl:h-4 bg-white rounded-full shadow-sm"></div>
                <p className="text-sm lg:text-base xl:text-lg font-medium text-blue-50">
                  Laporan komprehensif
                </p>
              </div>
            </div>
          </div>

          {/* Medical Cross Icon */}
          <svg
            aria-hidden="true"
            className="absolute top-12 lg:top-16 xl:top-20 right-12 lg:right-16 xl:right-20 2xl:right-24 w-14 lg:w-18 xl:w-22 2xl:w-24 h-14 lg:h-18 xl:h-22 2xl:h-24 opacity-25"
            viewBox="0 0 64 64"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect x="24" y="8" width="16" height="48" fill="white" rx="3" />
            <rect x="8" y="24" width="48" height="16" fill="white" rx="3" />
          </svg>

          {/* Pill Icons */}
          <svg
            aria-hidden="true"
            className="absolute top-28 lg:top-36 xl:top-44 left-12 lg:left-16 xl:left-20 2xl:left-24 w-12 lg:w-14 xl:w-18 2xl:w-20 h-12 lg:h-14 xl:h-18 2xl:h-20 opacity-20"
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <ellipse cx="24" cy="24" rx="20" ry="12" fill="white" />
            <rect x="4" y="20" width="40" height="8" fill="#0369a1" />
          </svg>

          <svg
            aria-hidden="true"
            className="absolute bottom-28 lg:bottom-36 xl:bottom-44 right-8 lg:right-12 xl:right-16 2xl:right-20 w-10 lg:w-12 xl:w-16 2xl:w-18 h-10 lg:h-12 xl:h-16 2xl:h-18 opacity-20"
            viewBox="0 0 40 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="20" cy="20" r="16" fill="white" />
            <circle cx="20" cy="20" r="8" fill="#0369a1" />
          </svg>

          {/* Medical Kit Icon */}
          <svg
            aria-hidden="true"
            className="absolute bottom-16 xl:bottom-20 left-8 lg:left-12 xl:left-16 w-8 lg:w-10 xl:w-12 h-8 lg:h-10 xl:h-12 opacity-15"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect x="4" y="8" width="24" height="16" rx="2" fill="white" />
            <rect x="12" y="4" width="8" height="4" rx="1" fill="white" />
            <rect x="14" y="12" width="4" height="8" fill="#0369a1" />
            <rect x="10" y="14" width="12" height="4" fill="#0369a1" />
          </svg>

          {/* Abstract Background Elements */}
          <div
            aria-hidden="true"
            className="absolute -bottom-72 -left-72 w-[700px] h-[700px] rounded-full bg-[#075985] opacity-20"
          ></div>

          <svg
            aria-hidden="true"
            className="absolute -top-32 -right-32 w-56 h-56 xl:w-64 xl:h-64"
            viewBox="0 0 224 224"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              cx="112"
              cy="112"
              r="112"
              fill="#075985"
              fillOpacity="0.25"
            />
            <g
              stroke="#38bdf8"
              strokeWidth="6"
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity="0.6"
            >
              <path d="M70 112 L90 92 L130 132 L154 108" />
              <circle cx="90" cy="92" r="5" fill="#38bdf8" />
              <circle cx="130" cy="132" r="5" fill="#38bdf8" />
              <circle cx="154" cy="108" r="5" fill="#38bdf8" />
            </g>
          </svg>

          <svg
            aria-hidden="true"
            className="absolute -bottom-32 -right-32 w-80 h-80 xl:w-96 xl:h-96"
            viewBox="0 0 320 320"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              cx="160"
              cy="160"
              r="160"
              stroke="#075985"
              strokeOpacity="0.12"
              strokeWidth="2"
            />
            <circle
              cx="200"
              cy="200"
              r="160"
              stroke="#075985"
              strokeOpacity="0.10"
              strokeWidth="2"
            />
            <circle
              cx="120"
              cy="120"
              r="160"
              stroke="#075985"
              strokeOpacity="0.08"
              strokeWidth="1"
            />
          </svg>
        </div>

        <div className="w-full md:w-[50%] lg:w-[50%] xl:w-[50%] flex flex-col justify-center px-8 sm:px-12 md:px-16 lg:px-20 xl:px-24 2xl:px-32 py-8 overflow-y-auto ">
          <div className="w-full mx-auto max-w-2xl lg:max-w-3xl xl:max-w-4xl 2xl:max-w-5xl">
            <div className="md:hidden flex justify-center mb-6">
              <div className="bg-primary text-white flex items-center text-2xl lg:text-3xl font-bold py-3 px-8 rounded-2xl shadow-lg">
                <img
                  src="/src/assets/img/repill.png"
                  alt="RePill Logo"
                  className="w-full h-8 "
                />
              </div>
            </div>

            <div className="text-center mb-6 lg:mb-8">
              <h2 className="text-2xl lg:text-3xl xl:text-4xl font-bold mb-2 lg:mb-3 text-slate-800 tracking-tight">
                {title}
              </h2>
              <div className="mb-3 lg:mb-4 text-slate-600 text-base">
                {subtitle}
              </div>
              <div className="w-16 lg:w-20 h-1.5 bg-primary mx-auto rounded-full shadow-sm"></div>
            </div>

            <div className="w-full">{children}</div>

            <div className="mt-6 lg:mt-8 pt-4 lg:pt-6">
              <p className="text-center text-xs lg:text-sm text-slate-500 leading-relaxed">
                Sistem ini dikembangkan untuk mendukung pelayanan kesehatan yang
                lebih baik.
                <br />
                Dengan menggunakan RePill, Anda setuju dengan{" "}
                <button
                  onClick={handleTermsClick}
                  className="text-primary font-semibold hover:underline transition-colors cursor-pointer"
                >
                  Syarat & Ketentuan
                </button>{" "}
                dan{" "}
                <button
                  onClick={handlePrivacyClick}
                  className="text-primary font-semibold hover:underline transition-colors cursor-pointer"
                >
                  Kebijakan Privasi
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>

      <TermsModal
        isOpen={showTermsModal}
        onClose={() => setShowTermsModal(false)}
      />

      <PrivacyModal
        isOpen={showPrivacyModal}
        onClose={() => setShowPrivacyModal(false)}
      />
    </>
  );
};

export default AuthLayout;
