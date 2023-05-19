"use client";
import React from "react";

function Button({ children }: { children: React.ReactNode }) {
  const handleClick = () => {};
  return (
    <button
      className="px-6 h-12 uppercase font-semibold tracking-wider border-2 border-black bg-teal-400 text-black"
      onClick={handleClick}
    >
      {children}
    </button>
  );
}

export default Button;
