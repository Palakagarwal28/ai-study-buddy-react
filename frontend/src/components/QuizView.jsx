import React , { useState } from "react";
import { useSaved } from "../context/SavedContext";
import { API_BASE_URL } from "../config";

export default function QuizView() {
  const [text, setText] = useState("");
  const [quiz, setQuiz] = useState([]);
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  

  const { saveItem } = useSaved();

  async function generateQuiz() {
    if (!text.trim()) {
      alert("Please enter some text");
      return;
    }

    setLoading(true);
    setQuiz([]);
    setAnswers({});
    setResult("");

    try {
      const res = await fetch(`${API_BASE_URL}/study/quiz`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });

      const data = await res.json();
      setQuiz(data.quiz);
    } catch (err) {
      console.error(err);
      alert("Failed to generate quiz");
    } finally {
      setLoading(false);
    }
  }

  function submitQuiz() {
    let score = 0;
    let details = [];

    quiz.forEach((q, i) => {
      const userAnswer = answers[i];
      if (userAnswer === q.answer) score++;

      details.push(
        `Q${i + 1}: ${q.question}\n` +
        `Your answer: ${q.options[userAnswer] ?? "Not answered"}\n` +
        `Correct answer: ${q.options[q.answer]}`
      );
    });

    const output =
      `Score: ${score}/${quiz.length}\n\n` + details.join("\n\n");

    setResult(output);
  }

  function saveQuiz() {
    saveItem({
      id: Date.now(),
      feature: "Quiz",
      input: text,
      output: result,
      timestamp: new Date().toLocaleString(),
    });

    alert("Quiz saved!");
  }

  return (
    <div className="max-w-4xl">
      <h1 className="text-2xl font-semibold mb-4">📝 Quiz</h1>

      <textarea
        className="w-full h-36 p-4 border rounded-lg mb-4"
        placeholder="Paste study text here..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <button
        onClick={generateQuiz}
        disabled={loading}
        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? "Generating..." : "Generate Quiz"}
      </button>

      {/* Quiz Questions */}
      {quiz.length > 0 && (
        <div className="mt-6 space-y-6">
          {quiz.map((q, i) => (
            <div key={i} className="bg-white border rounded-lg p-4">
              <p className="font-medium mb-2">
                {i + 1}. {q.question}
              </p>

              {q.options.map((opt, idx) => (
                <label key={idx} className="block mb-1">
                  <input
                    type="radio"
                    name={`q-${i}`}
                    value={idx}
                    onChange={() =>
                      setAnswers({ ...answers, [i]: idx })
                    }
                    className="mr-2"
                  />
                  {opt}
                </label>
              ))}
            </div>
          ))}

          <button
            onClick={submitQuiz}
            className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            Submit Quiz
          </button>
        </div>
      )}

      {/* Result */}
      {result && (
        <div className="mt-6 bg-white border rounded-lg p-4">
          <h2 className="font-medium mb-2">Quiz Result</h2>
          <pre className="whitespace-pre-wrap text-slate-700">
            {result}
          </pre>

          <button
            onClick={saveQuiz}
            className="mt-4 px-4 py-2 border rounded-lg hover:bg-slate-100"
          >
            ⭐ Save Quiz
          </button>
        </div>
      )}
    </div>
  );
}

