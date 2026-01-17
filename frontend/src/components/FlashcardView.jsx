import React from "react";
import { useState } from "react";
import { useSaved } from "../context/SavedContext";
import { API_BASE_URL } from "../config";

export default function FlashcardView() {
  const [text, setText] = useState("");
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(false);

  const { saveItem } = useSaved();

  async function generateFlashcards() {
    if (!text.trim()) {
      alert("Please enter some text");
      return;
    }

    setLoading(true);
    setCards([]);

    try {
      const res = await fetch(`${API_BASE_URL}/study/flashcards`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });

      const data = await res.json();

      if (Array.isArray(data.flashcards)) {
        setCards(data.flashcards);
        } else {
  console.error("Unexpected flashcards format:", data.flashcards);
  setCards([]);
        }

    } catch (err) {
      console.error(err);
      alert("Failed to generate flashcards");
    } finally {
      setLoading(false);
    }
  }

  function saveFlashcards() {
    const output = cards
      .map(
        (c, i) =>
          `Q${i + 1}: ${c.question}\nA: ${c.answer}`
      )
      .join("\n\n");

    saveItem({
      id: Date.now(),
      feature: "Flashcards",
      input: text,
      output,
      timestamp: new Date().toLocaleString(),
    });

    alert("Flashcards saved!");
  }

  return (
    <div className="max-w-4xl">
      <h1 className="text-2xl font-semibold mb-4">🗂 Flashcards</h1>

      <textarea
        className="w-full h-36 p-4 border rounded-lg mb-4"
        placeholder="Paste study text here..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <button
        onClick={generateFlashcards}
        disabled={loading}
        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? "Generating..." : "Generate Flashcards"}
      </button>

      {/* Flashcards */}
      {cards.length > 0 && (
        <div className="mt-6 space-y-4">
          {Array.isArray(cards) && cards.map((card, i) => (

            <details
              key={i}
              className="bg-white border rounded-lg p-4 cursor-pointer"
            >
              <summary className="font-medium">
                {i + 1}. {card.question}
              </summary>
              <p className="mt-2 text-slate-700">
                {card.answer}
              </p>
            </details>
          ))}
         

          <button
            onClick={saveFlashcards}
            className="mt-4 px-4 py-2 border rounded-lg hover:bg-slate-100"
          >
            ⭐ Save Flashcards
          </button>
        </div>
      )}
    </div>
  );
}

