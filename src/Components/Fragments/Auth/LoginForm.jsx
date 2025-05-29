import React, { useState } from "react";
import { User, KeyRound, Eye, EyeOff, Loader2 } from "lucide-react";
import AuthInput from "../../Elements/Inputs/AuthInput";
import AuthButton from "../../Elements/Buttons/AuthButton";
import { Link } from "react-router";
import useLogin from "../../../Hooks/useLogin";

const LoginForm = ({ onLoginSuccess, onLoginError }) => {
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
    } else if (formData.password.length < 6) {
      errors.password = "Kata sandi minimal 6 karakter";
    }

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }

    handleSubmit(e, onLoginSuccess, (error) => {
      if (error.status === 401 || error.status === 422) {
        setFieldErrors({
          username: "Username atau kata sandi salah",
          password: "Username atau kata sandi salah",
        });
      }

      onLoginError(error);
    });
  };

  return (
    <form className="space-y-6" onSubmit={handleFormSubmit}>
      <AuthInput
        id="username"
        type="text"
        placeholder="Masukkan Username/NIS/NPSN"
        value={formData.username}
        onChange={handleInputChange}
        onFocus={() => handleInputFocus("username")}
        label="Username/NIS/NPSN"
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
          <span className="inline-block text-xs text-primary mt-2 font-semibold cursor-pointer select-none transition-transform duration-200 hover:scale-105 origin-right">
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
    </form>
  );
};

export default LoginForm;
