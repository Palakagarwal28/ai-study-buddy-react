import React from "react";
import { NavLink } from "react-router-dom";

const base =
  "flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium transition";

const active =
  "bg-slate-200 text-slate-900";

const inactive =
  "text-slate-600 hover:bg-slate-100";

export default function Sidebar() {
  return (
    <aside className="w-64 border-r bg-white flex flex-col">
      
      {/* Header */}
      <div className="px-4 py-4 border-b">
        <h1 className="text-lg font-semibold">🤖 AI Study Buddy</h1>
        <p className="text-xs text-slate-500">
          Learn smarter, one step at a time
        </p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3 space-y-1">
        <NavLink
          to="/app/summary"
          className={({ isActive }) =>
            `${base} ${isActive ? active : inactive}`
          }
        >
          📘 Summary
        </NavLink>

        <NavLink
          to="/app/quiz"
          className={({ isActive }) =>
            `${base} ${isActive ? active : inactive}`
          }
        >
          📝 Quiz
        </NavLink>

        <NavLink
          to="/app/flashcards"
          className={({ isActive }) =>
            `${base} ${isActive ? active : inactive}`
          }
        >
          🗂 Flashcards
        </NavLink>

        <NavLink
          to="/app/math"
          className={({ isActive }) =>
            `${base} ${isActive ? active : inactive}`
          }
        >
          📐 Math Solver
        </NavLink>

        <NavLink
          to="/app/image"
          className={({ isActive }) =>
            `${base} ${isActive ? active : inactive}`
          }
        >
          🖼 Image Explain
        </NavLink>

        <NavLink
          to="/app/youtube"
          className={({ isActive }) =>
            `${base} ${isActive ? active : inactive}`
          }
        >
          📺 YouTube
        </NavLink>
        <NavLink
          to="/app/saved"
           className={({ isActive }) =>
    `         ${base} ${isActive ? active : inactive}`
          }
        >
        ⭐ Saved
        </NavLink>

      </nav>

      {/* Footer */}
      <div className="p-3 border-t text-xs text-slate-500">
        © 2026 AI Study Buddy
      </div>
    </aside>
  );
}

