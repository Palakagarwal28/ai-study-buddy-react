import React from "react";

const tabs = [
  "Summary",
  "Quiz",
  "Flashcards",
  "Math",
  "Image",
  "YouTube",
  "Saved",
];

export default function Tabs({ active, setActive }) {
  return (
    <div className="flex gap-2 flex-wrap justify-center mt-6">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => setActive(tab)}
          className={`px-4 py-2 rounded-lg border ${
            active === tab
              ? "bg-indigo-600 text-white"
              : "hover:bg-gray-100"
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}

