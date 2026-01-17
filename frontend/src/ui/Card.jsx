import React from "react";

export default function Card({ icon, title, description }) {
  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm hover:shadow-md transition">
      <div className="text-2xl mb-2">{icon}</div>
      <h3 className="font-semibold text-lg mb-1">{title}</h3>
      <p className="text-gray-600 text-sm">{description}</p>
    </div>
  );
}

