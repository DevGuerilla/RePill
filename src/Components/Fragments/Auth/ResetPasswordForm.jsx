import React, { useState } from "react";
import { KeyRound, Eye, EyeOff, Loader2 } from "lucide-react";
import AuthInput from "../../Elements/Inputs/AuthInput";
import AuthButton from "../../Elements/Buttons/AuthButton";
import useResetPassword from "../../../Hooks/useResetPassword";

const ResetPasswordForm = ({
  onResetPasswordSuccess,
  onResetPasswordError,
}) => {
  const { formData, isLoading, handleChange, handleSubmit, validateForm } =
    useResetPassword();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({
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

    handleSubmit(e, onResetPasswordSuccess, onResetPasswordError);
  };

  return (
    <form className="space-y-6" onSubmit={handleFormSubmit}>
      <div className="text-center mb-6">
        <p className="text-sm text-slate-600 leading-relaxed">
          Masukkan kata sandi baru untuk akun Anda. Pastikan kata sandi mudah
          diingat namun sulit ditebak oleh orang lain.
        </p>
      </div>

      <AuthInput
        id="password"
        type={showPassword ? "text" : "password"}
        placeholder="Masukkan kata sandi baru"
        value={formData.password}
        onChange={handleInputChange}
        onFocus={() => handleInputFocus("password")}
        label="Kata Sandi Baru"
        icon={KeyRound}
        rightIcon={showPassword ? Eye : EyeOff}
        onRightIconClick={togglePasswordVisibility}
        error={fieldErrors.password}
      />

      <AuthInput
        id="confirmPassword"
        type={showConfirmPassword ? "text" : "password"}
        placeholder="Konfirmasi kata sandi baru"
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
            Mengubah Kata Sandi...
          </span>
        ) : (
          "Ubah Kata Sandi"
        )}
      </AuthButton>
    </form>
  );
};

export default ResetPasswordForm;
