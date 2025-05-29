import React, { useState } from "react";

const AuthInput = ({
  id,
  type = "text",
  placeholder,
  value,
  onChange,
  label,
  icon: Icon,
  rightIcon: RightIcon = null,
  onRightIconClick = null,
  error = null,
  onFocus = null,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isRippling, setIsRippling] = useState(false);

  const handleRightIconClick = (e) => {
    if (onRightIconClick) {
      setIsRippling(true);
      setTimeout(() => setIsRippling(false), 300);

      onRightIconClick(e);
    }
  };

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
    <div className="mb-4 transform transition duration-200 ease-in-out hover:translate-y-[-2px]">
      <label
        htmlFor={id}
        className={`block font-semibold mb-2 text-sm transition-all duration-300 ${
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
            className={`absolute inset-y-0 left-4 flex items-center transition-colors duration-300 ${
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
        <input
          id={id}
          type={type}
          placeholder={placeholder}
          className={`w-full border rounded-md text-sm text-slate-700 placeholder-gray-300 focus:outline-none focus:ring-1 transition-all duration-300 py-3.5 ${
            Icon ? "pl-12" : "pl-4"
          } ${RightIcon ? "pr-12" : "pr-4"} ${
            error
              ? "border-red-500 focus:border-red-500 focus:ring-red-500"
              : isFocused
              ? "shadow-md border-primary focus:ring-primary focus:border-primary"
              : "border-gray-300"
          }`}
          value={value}
          onChange={onChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
        {RightIcon && (
          <span
            className={`absolute inset-y-0 right-4 flex items-center cursor-pointer transition-all duration-300 ${
              error
                ? "text-red-500"
                : isFocused
                ? "text-primary"
                : "text-gray-400"
            } ${isRippling ? "animate-pulse" : ""}`}
            onClick={handleRightIconClick}
          >
            <div
              className={`relative ${
                isRippling
                  ? "after:content-[''] after:absolute after:inset-0 after:bg-primary after:bg-opacity-20 after:rounded-full after:animate-ping"
                  : ""
              }`}
            >
              <RightIcon size={22} strokeWidth={2} />
            </div>
          </span>
        )}
      </div>
      {error && (
        <div className="mt-2 transition-all duration-300 ease-in-out">
          <p className="text-red-600 text-xs font-medium">{error}</p>
        </div>
      )}
    </div>
  );
};

export default AuthInput;
