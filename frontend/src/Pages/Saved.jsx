import React from "react";
export default function Saved() {
  const savedItems = [
    {
      id: 1,
      title: "Photosynthesis summary",
      type: "Summary",
      date: "Jan 12, 2026",
      icon: "📘",
    },
    {
      id: 2,
      title: "Algebra flashcards",
      type: "Flashcards",
      date: "Jan 11, 2026",
      icon: "🧠",
    },
    {
      id: 3,
      title: "Solve x² + 5x + 6",
      type: "Math",
      date: "Jan 10, 2026",
      icon: "🧮",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-indigo-50 to-purple-50 px-6 py-12">
      <div className="max-w-4xl mx-auto fade-in">

        {/* Header */}
        <h1 className="text-3xl font-bold text-slate-800 mb-2">
          ⭐ Saved Searches
        </h1>
        <p className="text-slate-600 mb-8">
          Revisit your past learning anytime.
        </p>

        {/* Empty State */}
        {savedItems.length === 0 && (
          <div className="bg-white rounded-xl p-10 text-center shadow-sm">
            <div className="text-4xl mb-3">📂</div>
            <h3 className="font-semibold text-slate-800 mb-1">
              No saved items yet
            </h3>
            <p className="text-slate-600 text-sm">
              Start learning and save your favorite results.
            </p>
          </div>
        )}

        {/* Saved List */}
        <div className="space-y-4">
          {savedItems.map((item, index) => (
            <div
              key={item.id}
              className={`bg-white rounded-xl p-5 shadow-sm slide-up delay-${index + 1}00
                hover:shadow-lg hover:-translate-y-1 transition-all duration-200`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="text-3xl">{item.icon}</div>
                  <div>
                    <h3 className="font-semibold text-slate-800">
                      {item.title}
                    </h3>
                    <p className="text-sm text-slate-500">
                      {item.type} • {item.date}
                    </p>
                  </div>
                </div>

                <button className="text-sm text-blue-600 font-medium hover:underline">
                  Open
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
