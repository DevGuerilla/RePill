import { useDispatch, useSelector } from "react-redux";
import {
  logoutStart,
  logoutSuccess,
  logoutFailure,
  selectIsLoading,
} from "../../Redux/Features/Auth/AuthStore";
import { logout as logoutService } from "../../Services/Auth/AuthService";

const useLogout = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);

  const handleLogout = async (onSuccess, onError) => {
    try {
      dispatch(logoutStart());
      const response = await logoutService();

      if (response?.success) {
        dispatch(logoutSuccess());

        if (onSuccess) {
          onSuccess({
            message:
              response.message ||
              "Berhasil keluar. Terima kasih telah menggunakan SAPA.",
            type: "success",
          });
        }
      } else {
        throw new Error(response?.message || "Gagal keluar dari sistem.");
      }
    } catch (error) {
      const errorMessage =
        error.message ||
        "Terjadi kesalahan saat keluar. Namun Anda tetap akan keluar dari sistem.";
      dispatch(logoutFailure(errorMessage));

      setTimeout(() => {
        dispatch(logoutSuccess());
      }, 1000);

      if (onError) {
        onError({
          message: errorMessage,
          type: error.type || "warning",
          status: error.status,
        });
      }
    }
  };

  return {
    isLoading,
    handleLogout,
  };
};

export default useLogout;
