import React , { useState } from "react";
import { useSaved } from "../context/SavedContext";
import { API_BASE_URL } from "../config";

export default function ImageUpload() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const { saveItem } = useSaved();

async function explainImage() {
  console.log("Explain Image clicked");
  console.log("File value:", file);

  if (!file) {
    alert("Please upload an image");
    return;
  }

  setLoading(true);
  setResult("");

  const formData = new FormData();
  formData.append("file", file);

  console.log("Sending request to backend");

  try {
    const res = await fetch(`${API_BASE_URL}/study/image`, {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    setResult(data.explanation);
  } catch (err) {
    console.error(err);
    alert("Failed to process image");
  } finally {
    setLoading(false);
  }
}

 

  function saveImageResult() {
    saveItem({
      id: Date.now(),
      feature: "Image Explain",
      input: file?.name || "Uploaded image",
      output: result,
      timestamp: new Date().toLocaleString(),
    });

    alert("Image explanation saved!");
  }

  return (
    <div className="max-w-4xl">
      <h1 className="text-2xl font-semibold mb-4">🖼 Image Explain</h1>

      <input
        type="file"
        accept="image/*"
        onChange={(e) => setFile(e.target.files[0])}
        className="mb-4"
      />

      <div>
        <button
          onClick={explainImage}
          disabled={loading}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? "Processing..." : "Explain Image"}
        </button>
      </div>

      {result && (
        <div className="mt-6 bg-white border rounded-lg p-4">
          <h2 className="font-medium mb-2">Explanation</h2>
          <pre className="whitespace-pre-wrap text-slate-700">
            {result}
          </pre>

          <button
            onClick={saveImageResult}
            className="mt-4 px-4 py-2 border rounded-lg hover:bg-slate-100"
          >
            ⭐ Save Result
          </button>
        </div>
      )}
    </div>
  );
}
