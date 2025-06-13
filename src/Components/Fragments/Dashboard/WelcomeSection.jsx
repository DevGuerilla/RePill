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
    <div className="bg-primary rounded-lg p-6 text-white">
      <h1 className="text-2xl font-bold mb-2">
        Selamat datang kembali, {displayName}! 👋
      </h1>
      <p className="opacity-90">
        Berikut adalah ringkasan sistem manajemen apotek Anda hari ini.
      </p>
    </div>
  );
};

export default WelcomeSection;
