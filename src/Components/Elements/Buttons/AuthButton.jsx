import React from "react";

/**
 * Komponen Button untuk halaman autentikasi
 * @param {Object} props - Props komponen
 * @param {string} props.type - Tipe button (button, submit, reset)
 * @param {ReactNode} props.children - Konten button
 * @param {Function} props.onClick - Handler click
 * @param {boolean} props.fullWidth - Apakah button full width
 * @param {string} props.variant - Variant button (primary, secondary, outline)
 * @param {boolean} props.disabled - Status disabled
 */
const AuthButton = ({
  type = "button",
  children,
  onClick,
  fullWidth = true,
  variant = "primary",
  disabled = false,
}) => {
  const baseClasses =
    "font-medium py-4 rounded-md text-sm transition-all hover:scale-[1.05]";

  const variantClasses = {
    primary: "bg-primary hover:bg-primary-hover text-white",
    secondary: "bg-gray-200 hover:bg-gray-300 text-slate-800",
    outline:
      "bg-transparent border border-primary text-primary hover:bg-primary-light",
  };

  const disabledClasses = disabled
    ? "opacity-70 cursor-not-allowed hover:scale-100"
    : "";

  return (
    <button
      type={type}
      className={`${baseClasses} ${variantClasses[variant]} ${
        fullWidth ? "w-full" : ""
      } ${disabledClasses}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default AuthButton;
