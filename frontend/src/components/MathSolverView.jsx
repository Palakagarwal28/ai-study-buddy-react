import React ,{ useState } from "react";
import { useSaved } from "../context/SavedContext";
import { API_BASE_URL } from "../config";

export default function MathSolverView() {
  const [mode, setMode] = useState("text"); // "text" | "image"
  const [text, setText] = useState("");
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);

  const [solution, setSolution] = useState("");
  const [loading, setLoading] = useState(false);
  const [answerMode, setAnswerMode] = useState("explain"); // "answer" | "explain"
  const { saveItem } = useSaved();

  async function solveProblem() {
    if (mode === "text" && !text.trim()) {
      alert("Please enter a math problem");
      return;
    }

    if (mode === "image" && !file) {
      alert("Please upload an image");
      return;
    }

    setLoading(true);
    setSolution("");

    try {
      let res;

      if (mode === "text") {
        res = await fetch(`${API_BASE_URL}/study/math`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
          problem: text,
          mode: answerMode,
          }),

        });
      } else {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("mode", answerMode);

        res = await fetch(`${API_BASE_URL}/study/math/image`, {
          method: "POST",
          body: formData,
        });
      }

      const data = await res.json();
      setSolution(data.solution);
    } catch (err) {
      console.error(err);
      alert("Failed to solve problem");
    } finally {
      setLoading(false);
    }
  }

  function saveSolution() {
    saveItem({
      id: Date.now(),
      feature: "Math Solver",
      input: mode === "text" ? text : file?.name,
      output: solution,
      timestamp: new Date().toLocaleString(),
    });

    alert("Solution saved!");
  }

  return (
    <div className="max-w-4xl">
      <h1 className="text-2xl font-semibold mb-4">📐 Math Solver</h1>

      {/* Mode Toggle */}
      <div className="inline-flex mb-4 rounded-lg border bg-white">
        <button
          onClick={() => setMode("text")}
          className={`px-4 py-2 rounded-l-lg ${
            mode === "text"
              ? "bg-blue-600 text-white"
              : "hover:bg-slate-100"
          }`}
        >
          Text
        </button>
        <button
          onClick={() => setMode("image")}
          className={`px-4 py-2 rounded-r-lg ${
            mode === "image"
              ? "bg-blue-600 text-white"
              : "hover:bg-slate-100"
          }`}
        >
          Image
        </button>
      </div>

      {/* TEXT MODE */}
      {mode === "text" && (
        <textarea
          className="w-full h-32 p-4 border rounded-lg mb-4"
          placeholder="Enter a math problem (e.g. Solve 3x + 5 = 20)"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      )}

      {/* IMAGE MODE */}
      {mode === "image" && (
        <div className="mb-4">
          <input
            type="file"
            accept="file/*"
            onChange={(e) => {
              const file = e.target.files[0];
              setFile(file);
              setPreview(URL.createObjectURL(file));
            }}
          />

          {preview && (
            <img
              src={preview}
              alt="Preview"
              className="mt-4 max-h-64 rounded border"
            />
          )}
        </div>
      )}
      {/* Answer Mode Toggle */}
      <div className="inline-flex mb-4 ml-4 rounded-lg border bg-white">
        <button
          onClick={() => setAnswerMode("answer")}
          className={`px-4 py-2 rounded-l-lg ${
          answerMode === "answer"
             ? "bg-green-600 text-white"
             : "hover:bg-slate-100"
        }`}
        >
        Final Answer
        </button>
        <button
          onClick={() => setAnswerMode("explain")}
          className={`px-4 py-2 rounded-r-lg ${
          answerMode === "explain"
            ? "bg-green-600 text-white"
            : "hover:bg-slate-100"
        }`}
        >
        Explain
        </button>
      </div>

      {/* Solve Button */}
      <button
        onClick={solveProblem}
        disabled={loading}
        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? "Solving..." : "Solve Problem"}
      </button>

      {/* Solution */}
      {solution && (
        <div className="mt-6 bg-white border rounded-lg p-4">
          <h2 className="font-medium mb-2">Solution</h2>
          <pre className="whitespace-pre-wrap text-slate-700">
            {solution}
          </pre>

          <button
            onClick={saveSolution}
            className="mt-4 px-4 py-2 border rounded-lg hover:bg-slate-100"
          >
            ⭐ Save Solution
          </button>
        </div>
      )}
    </div>
  );
}
