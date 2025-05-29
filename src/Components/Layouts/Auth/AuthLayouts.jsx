import React from "react";

const AuthLayout = ({ children, title, subtitle }) => {
  return (
    <div className="min-h-screen flex flex-col md:flex-row overflow-hidden">
      <div className="hidden md:flex md:w-[55%] lg:w-[55%] relative flex-col justify-center px-6 md:px-12 lg:px-20 py-16 md:py-20 lg:py-28 bg-gradient-to-b from-[#009C24] to-[#007D1D] text-white overflow-hidden">
        <div className="z-10 text-left ml-8">
          <h1 className="text-5xl font-extrabold mb-4">SAPA</h1>
          <p className="font-semibold max-w-md text-lg mb-6">
            Permudah interaksi Anda &amp; Siswa secara online.
          </p>
        </div>

        <div
          aria-hidden="true"
          className="absolute -bottom-64 -left-64 w-[600px] h-[600px] rounded-full bg-[#0F4A14]"
        ></div>

        <svg
          aria-hidden="true"
          className="absolute -top-28 -right-28 w-48 h-48"
          viewBox="0 0 192 192"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="96" cy="96" r="96" fill="#0F4A14" />
          <g
            stroke="#00E62E"
            strokeWidth="12"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.7"
          >
            <line x1="40" y1="152" x2="152" y2="40" />
            <line x1="56" y1="168" x2="168" y2="56" />
            <line x1="24" y1="136" x2="136" y2="24" />
            <line x1="72" y1="184" x2="184" y2="72" />
            <line x1="8" y1="120" x2="120" y2="8" />
          </g>
        </svg>

        <svg
          aria-hidden="true"
          className="absolute -bottom-28 -right-28 w-72 h-72"
          viewBox="0 0 288 288"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            cx="144"
            cy="144"
            r="144"
            stroke="#0F4A14"
            strokeOpacity="0.15"
            strokeWidth="2"
          />
          <circle
            cx="192"
            cy="192"
            r="144"
            stroke="#0F4A14"
            strokeOpacity="0.15"
            strokeWidth="2"
          />
        </svg>
      </div>

      <div className="w-full md:w-[45%] lg:w-[45%] flex flex-col justify-center px-4 sm:px-6 md:px-8 lg:px-10 py-16 md:py-20 lg:py-28">
        <div className="w-[95%] mx-auto">
          <div className="md:hidden flex justify-center mb-8">
            <div className="bg-primary text-white text-3xl font-bold py-2 px-6 rounded-lg">
              SAPA
            </div>
          </div>

          <h2 className="text-2xl font-bold mb-4 text-center">{title}</h2>
          <p className="text-center mb-12 text-sm leading-tight">{subtitle}</p>

          <div>{children}</div>

          <p className="text-center text-xs mt-8 mx-auto leading-tight">
            Dengan menggunakan layanan kami, Anda berarti setuju atas
            <a href="#" className="text-primary font-semibold hover:underline">
              {" "}
              Syarat &amp; ketentuan
            </a>{" "}
            dan
            <a href="#" className="text-primary font-semibold hover:underline">
              {" "}
              Kebijakan Privasi
            </a>{" "}
            SAPA
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
