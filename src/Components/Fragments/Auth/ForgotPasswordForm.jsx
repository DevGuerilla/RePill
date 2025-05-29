import React, { useState } from "react";
import { Mail, Loader2, ArrowLeft } from "lucide-react";
import AuthInput from "../../Elements/Inputs/AuthInput";
import AuthButton from "../../Elements/Buttons/AuthButton";
import { Link } from "react-router";
import useForgotPassword from "../../../Hooks/useForgotPassword";

const ForgotPasswordForm = ({
  onForgotPasswordSuccess,
  onForgotPasswordError,
}) => {
  const { formData, isLoading, handleChange, handleSubmit, validateForm } =
    useForgotPassword();
  const [fieldErrors, setFieldErrors] = useState({
    email: null,
  });

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
      email: null,
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

    handleSubmit(e, onForgotPasswordSuccess, (error) => {
      if (error.status === 404) {
        setFieldErrors({
          email: "Email tidak terdaftar dalam sistem",
        });
      }

      onForgotPasswordError(error);
    });
  };

  return (
    <form className="space-y-6" onSubmit={handleFormSubmit}>
      <div className="text-center mb-6">
        <p className="text-sm text-slate-600 leading-relaxed">
          Masukkan alamat email yang terdaftar pada akun Anda. Kami akan
          mengirimkan link untuk mereset kata sandi ke email tersebut.
        </p>
      </div>

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

      <AuthButton type="submit" disabled={isLoading}>
        {isLoading ? (
          <span className="flex items-center justify-center">
            <Loader2 className="animate-spin mr-2" size={20} />
            Mengirim Email...
          </span>
        ) : (
          "Kirim Link Reset"
        )}
      </AuthButton>

      <div className="text-center">
        <Link
          to="/masuk"
          className="inline-flex items-center text-sm text-primary font-semibold hover:underline"
        >
          <ArrowLeft className="mr-1" size={16} />
          Kembali ke Login
        </Link>
      </div>
    </form>
  );
};

export default ForgotPasswordForm;
