import React from "react";
import Button from "../ui/Button";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  return (
    <nav className="flex items-center justify-between px-6 py-4">
      <h1 className="text-xl font-bold text-textMain">
        AI Study Buddy
      </h1>

      <Button onClick={() => navigate("/app")}>
        Get Started
      </Button>
      <li className="hover:text-blue-600 cursor-pointer">
  ⭐  Saved
      </li>
      <Link to="/saved">⭐ Saved</Link>


    </nav>
  );
}
