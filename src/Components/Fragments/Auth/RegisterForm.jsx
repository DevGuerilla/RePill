import React, { useState } from "react";
import {
  User,
  Mail,
  KeyRound,
  Eye,
  EyeOff,
  UserCheck,
  Loader2,
} from "lucide-react";
import AuthInput from "../../Elements/Inputs/AuthInput";
import AuthButton from "../../Elements/Buttons/AuthButton";
import { Link } from "react-router";
import useRegister from "../../../Hooks/useRegister";

const RegisterForm = ({ onRegisterSuccess, onRegisterError }) => {
  const { formData, isLoading, handleChange, handleSubmit, validateForm } =
    useRegister();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({
    username: null,
    fullName: null,
    email: null,
    password: null,
    confirmPassword: null,
  });

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
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
      fullName: null,
      email: null,
      password: null,
      confirmPassword: null,
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

    const errors = validateForm();

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }

    handleSubmit(e, onRegisterSuccess, (error) => {
      if (error.status === 422) {
        setFieldErrors({
          username: "Username sudah digunakan",
          email: "Email sudah terdaftar",
        });
      }

      onRegisterError(error);
    });
  };

  return (
    <form className="space-y-3 lg:space-y-4" onSubmit={handleFormSubmit}>
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

      <AuthInput
        id="fullName"
        type="text"
        placeholder="Masukkan nama lengkap"
        value={formData.fullName}
        onChange={handleInputChange}
        onFocus={() => handleInputFocus("fullName")}
        label="Nama Lengkap"
        icon={UserCheck}
        error={fieldErrors.fullName}
      />

      <AuthInput
        id="email"
        type="email"
        placeholder="Masukkan email"
        value={formData.email}
        onChange={handleInputChange}
        onFocus={() => handleInputFocus("email")}
        label="Email"
        icon={Mail}
        error={fieldErrors.email}
      />

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

      <AuthInput
        id="confirmPassword"
        type={showConfirmPassword ? "text" : "password"}
        placeholder="Konfirmasi kata sandi"
        value={formData.confirmPassword}
        onChange={handleInputChange}
        onFocus={() => handleInputFocus("confirmPassword")}
        label="Konfirmasi Kata Sandi"
        icon={KeyRound}
        rightIcon={showConfirmPassword ? Eye : EyeOff}
        onRightIconClick={toggleConfirmPasswordVisibility}
        error={fieldErrors.confirmPassword}
      />

      <AuthButton type="submit" disabled={isLoading}>
        {isLoading ? (
          <span className="flex items-center justify-center">
            <Loader2 className="animate-spin mr-2" size={20} />
            Memproses...
          </span>
        ) : (
          "Daftar"
        )}
      </AuthButton>

      <div className="text-center pt-2 lg:pt-3">
        <span className="text-sm lg:text-base text-slate-600">
          Sudah punya akun?{" "}
          <Link
            to="/masuk"
            className="text-primary font-semibold hover:underline hover:text-blue-600 transition-colors"
          >
            Masuk di sini
          </Link>
        </span>
      </div>
    </form>
  );
};

export default RegisterForm;
