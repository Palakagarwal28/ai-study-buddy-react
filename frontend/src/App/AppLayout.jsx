import React from "react";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

export default function AppLayout() {
  console.log("AppLayout mounted");
  return (
    <div className="flex h-screen">
      <Sidebar />
      <main className="flex-1 p-4">
        <Outlet />
      </main>
    </div>
  );
}


