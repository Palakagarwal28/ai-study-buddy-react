import React from "react";

export default function Button({ children, variant = "primary", ...props }) {
  const base =
    "px-6 py-3 rounded-xl font-semibold transition-all duration-200";

  const styles = {
    primary:
      "bg-[var(--blue-soft)] text-white shadow-md hover:scale-105 hover:shadow-lg",
    secondary:
      "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50",
  };

  return (
    <button className={`${base} ${styles[variant]}`} {...props}>
      {children}
    </button>
  );
}


