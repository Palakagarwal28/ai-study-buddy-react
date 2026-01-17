import React from "react";
import { useSaved } from "../context/SavedContext";

export default function SavedSearches() {
  const { savedItems } = useSaved();

  function downloadNotes() {
    if (savedItems.length === 0) {
      alert("No saved items to download");
      return;
    }

    let content = "AI Study Buddy Notes\n====================\n\n";

    savedItems.forEach((item, index) => {
      content += `${index + 1}. Feature: ${item.feature}\n`;
      content += `Input: ${item.input}\n\n`;
      content += `Output:\n${item.output}\n\n`;
      content += "--------------------------------\n\n";
    });

    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "ai-study-buddy-notes.txt";
    a.click();

    URL.revokeObjectURL(url);
  }

  return (
    <div className="max-w-4xl">
      <h1 className="text-2xl font-semibold mb-4">⭐ Saved Items</h1>

      <button
        onClick={downloadNotes}
        className="mb-4 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
      >
        📥 Download Notes
      </button>

      {savedItems.length === 0 && (
        <div className="text-slate-500 border rounded-lg p-6 bg-white">
          No saved items yet.
          <br />
          Save summaries, quizzes, flashcards, or solutions to see them here.
        </div>
      )}

      <div className="space-y-4">
        {savedItems.map((item) => (
          <details
            key={item.id}
            className="bg-white border rounded-lg p-4"
          >
            <summary className="cursor-pointer">
              <div className="flex justify-between items-center">
                <span className="font-medium">{item.feature}</span>
                <span className="text-xs text-slate-500">
                  {item.timestamp}
                </span>
              </div>
            </summary>

            <div className="mt-4 space-y-3">
              <div>
                <p className="text-xs uppercase text-slate-500 mb-1">
                  Input
                </p>
                <pre className="bg-slate-50 p-3 rounded text-sm whitespace-pre-wrap">
                  {item.input}
                </pre>
              </div>

              <div>
                <p className="text-xs uppercase text-slate-500 mb-1">
                  Output
                </p>
                <pre className="bg-slate-50 p-3 rounded text-sm whitespace-pre-wrap">
                  {item.output}
                </pre>
              </div>
            </div>
          </details>
        ))}
      </div>
    </div>
  );
}
