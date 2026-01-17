import React from "react";
import { Link } from "react-router-dom";

export default function FeatureCard({ to, icon, title, description }) {
  return (
    <Link
      to={to}
      className="
        group block bg-white rounded-2xl p-6
        shadow-sm hover:shadow-lg
        transition transform hover:-translate-y-1
        border border-slate-100
      "
    >
      <div className="text-3xl mb-3">{icon}</div>

      <h3 className="text-lg font-semibold text-slate-800 group-hover:text-blue-600">
        {title}
      </h3>

      <p className="text-sm text-slate-600 mt-1">
        {description}
      </p>
    </Link>
  );
}
