import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useProfile } from "../../../Hooks/Profile/useProfile";
import {
  selectIsAuthenticated,
  selectUser,
} from "../../../Redux/Features/Auth/AuthStore";

const WelcomeSection = () => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const user = useSelector(selectUser);
  const { profile, fetchProfile } = useProfile();

  const currentUser = profile || user;
  const displayName = currentUser?.fullname || currentUser?.name || "Pengguna";

  useEffect(() => {
    if (isAuthenticated && !currentUser) {
      fetchProfile();
    }
  }, [isAuthenticated, currentUser, fetchProfile]);

  return (
    <section
      className="bg-primary rounded-lg p-4 sm:p-6 text-white"
      role="banner"
      aria-labelledby="welcome-title"
    >
      <h1
        id="welcome-title"
        className="text-lg sm:text-xl lg:text-2xl font-bold mb-2 leading-tight"
        style={{ fontSize: "clamp(1.125rem, 2.5vw, 1.5rem)" }}
      >
        Selamat datang kembali, {displayName}! 👋
      </h1>
      <p
        className="opacity-90 text-sm sm:text-base leading-relaxed"
        style={{ fontSize: "clamp(0.875rem, 2vw, 1rem)" }}
      >
        Berikut adalah ringkasan sistem manajemen apotek Anda hari ini.
      </p>
    </section>
  );
};

export default WelcomeSection;
