import React, { useState } from "react";

const AuthSelect = ({
  id,
  label,
  value,
  onChange,
  options = [],
  placeholder = "Pilih opsi",
  icon: Icon,
  error = null,
  disabled = false,
  loading = false,
  onFocus = null,
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
    if (onFocus) {
      onFocus();
    }
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  return (
    <div className="mb-2 lg:mb-3 transform transition duration-200 ease-in-out hover:translate-y-[-1px]">
      <label
        htmlFor={id}
        className={`block font-semibold mb-0.5 lg:mb-1 text-sm transition-all duration-300 ${
          error
            ? "text-red-600"
            : isFocused
            ? "text-primary transform scale-105 origin-left"
            : "text-slate-800"
        }`}
      >
        {label}
      </label>
      <div className="relative">
        {Icon && (
          <span
            className={`absolute inset-y-0 left-4 flex items-center transition-colors duration-300 pointer-events-none ${
              error
                ? "text-red-500"
                : isFocused
                ? "text-primary"
                : "text-gray-400"
            }`}
          >
            <Icon size={22} strokeWidth={2} />
          </span>
        )}
        <select
          id={id}
          name={id}
          value={value}
          onChange={onChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          disabled={disabled || loading}
          className={`w-full border rounded-md text-sm text-slate-700 focus:outline-none focus:ring-1 transition-all duration-300 py-3.5 ${
            Icon ? "pl-12" : "pl-4"
          } pr-4 appearance-none bg-white ${
            error
              ? "border-red-500 focus:border-red-500 focus:ring-red-500"
              : isFocused
              ? "shadow-md border-primary focus:ring-primary focus:border-primary"
              : "border-gray-300"
          } ${disabled || loading ? "opacity-50 cursor-not-allowed" : ""}`}
        >
          <option value="" disabled>
            {loading ? "Memuat..." : placeholder}
          </option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        {/* Custom dropdown arrow */}
        <div
          className={`absolute inset-y-0 right-4 flex items-center pointer-events-none transition-colors duration-300 ${
            error
              ? "text-red-500"
              : isFocused
              ? "text-primary"
              : "text-gray-400"
          }`}
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </div>
      {error && (
        <div className="mt-1 lg:mt-1.5 transition-all duration-300 ease-in-out">
          <p className="text-red-600 text-xs font-medium">{error}</p>
        </div>
      )}
    </div>
  );
};

export default AuthSelect;
