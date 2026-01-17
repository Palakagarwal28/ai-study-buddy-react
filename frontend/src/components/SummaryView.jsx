import React from "react";
import { useState } from "react";
import { useSaved } from "../context/SavedContext";
import { API_BASE_URL } from "../config";

export default function SummaryView() {
  const [text, setText] = useState("");
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);

  const { saveItem } = useSaved();

  async function generateSummary() {
    if (!text.trim()) {
      alert("Please enter some text");
      return;
    }

    setLoading(true);
    setSummary("");

    try {
      const res = await fetch(`${API_BASE_URL}/study/summary`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });

      const data = await res.json();
      setSummary(data.summary);
    } catch (err) {
      console.error(err);
      alert("Failed to generate summary");
    } finally {
      setLoading(false);
    }
  }

  function saveSummary() {
    saveItem({
      id: Date.now(),
      feature: "Summary",
      input: text,
      output: summary,
      timestamp: new Date().toLocaleString(),
    });

    alert("Summary saved!");
  }

  return (
    <div className="max-w-4xl">
      <h1 className="text-2xl font-semibold mb-4">📘 Smart Summary</h1>

      <textarea
        className="w-full h-40 p-4 border rounded-lg mb-4"
        placeholder="Paste your study notes here..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <button
        onClick={generateSummary}
        disabled={loading}
        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? "Generating..." : "Generate Summary"}
      </button>

      {summary && (
        <div className="mt-6 bg-white border rounded-lg p-4">
          <h2 className="font-medium mb-2">Generated Summary</h2>
          <p className="whitespace-pre-line text-slate-700">
            {summary}
          </p>

          <button
            onClick={saveSummary}
            className="mt-4 px-4 py-2 border rounded-lg hover:bg-slate-100"
          >
            ⭐ Save Summary
          </button>
        </div>
      )}
    </div>
  );
}
