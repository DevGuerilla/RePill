import React, { useState } from "react";
import { User, KeyRound, Eye, EyeOff, Loader2 } from "lucide-react";
import AuthInput from "../../Elements/Inputs/AuthInput";
import AuthButton from "../../Elements/Buttons/AuthButton";
import { Link, useNavigate } from "react-router";
import useLogin from "../../../Hooks/useLogin";

const LoginForm = ({ onLoginSuccess, onLoginError }) => {
  const navigate = useNavigate();
  const { formData, isLoading, handleChange, handleSubmit } = useLogin();
  const [showPassword, setShowPassword] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({
    username: null,
    password: null,
  });

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleInputChange = (e) => {
    const { id } = e.target;

    if (fieldErrors[id]) {
      setFieldErrors((prev) => ({
        ...prev,
        [id]: null,
      }));
    }

    handleChange(e);
  };

  const clearFieldErrors = () => {
    setFieldErrors({
      username: null,
      password: null,
    });
  };

  const handleInputFocus = (fieldName) => {
    if (fieldErrors[fieldName]) {
      setFieldErrors((prev) => ({
        ...prev,
        [fieldName]: null,
      }));
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    clearFieldErrors();

    const errors = {};

    if (!formData.username) {
      errors.username = "Username tidak boleh kosong";
    }

    if (!formData.password) {
      errors.password = "Kata sandi tidak boleh kosong";
    }

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }

    handleSubmit(
      e,
      () => {
        // Redirect to dashboard after successful login
        navigate("/dashboard");
        if (onLoginSuccess) onLoginSuccess();
      },
      (error) => {
        if (error.status === 401 || error.status === 422) {
          setFieldErrors({
            username: "Username atau kata sandi salah",
            password: "Username atau kata sandi salah",
          });
        }

        onLoginError(error);
      }
    );
  };

  return (
    <form className="space-y-4 lg:space-y-5" onSubmit={handleFormSubmit}>
      <AuthInput
        id="username"
        type="text"
        placeholder="Masukkan username"
        value={formData.username}
        onChange={handleInputChange}
        onFocus={() => handleInputFocus("username")}
        label="Username"
        icon={User}
        error={fieldErrors.username}
      />

      <div>
        <AuthInput
          id="password"
          type={showPassword ? "text" : "password"}
          placeholder="Masukkan kata sandi"
          value={formData.password}
          onChange={handleInputChange}
          onFocus={() => handleInputFocus("password")}
          label="Kata Sandi"
          icon={KeyRound}
          rightIcon={showPassword ? Eye : EyeOff}
          onRightIconClick={togglePasswordVisibility}
          error={fieldErrors.password}
        />
        <Link to="/lupa-kata-sandi" className="block text-right">
          <span className="inline-block text-xs lg:text-sm text-primary mt-1.5 lg:mt-2 font-semibold cursor-pointer select-none transition-all duration-200 hover:scale-105 hover:text-blue-600 origin-right">
            Lupa kata Sandi?
          </span>
        </Link>
      </div>

      <AuthButton type="submit" disabled={isLoading}>
        {isLoading ? (
          <span className="flex items-center justify-center">
            <Loader2 className="animate-spin mr-2" size={20} />
            Memproses...
          </span>
        ) : (
          "Masuk"
        )}
      </AuthButton>

      <div className="text-center pt-3 lg:pt-4">
        <span className="text-sm lg:text-base text-slate-600">
          Belum punya akun?{" "}
          <Link
            to="/daftar"
            className="text-primary font-semibold hover:underline hover:text-blue-600 transition-colors"
          >
            Daftar di sini
          </Link>
        </span>
      </div>
    </form>
  );
};

export default LoginForm;
