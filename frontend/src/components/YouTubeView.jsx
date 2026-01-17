import React , { useState } from "react";
import { useSaved } from "../context/SavedContext";
import { API_BASE_URL } from "../config";

export default function YouTubeView() {
  const [text, setText] = useState("");
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);

  const { saveItem } = useSaved();

  async function getVideos() {
    if (!text.trim()) {
      alert("Please enter a topic");
      return;
    }

    setLoading(true);
    setVideos([]);

    try {
      const res = await fetch(`${API_BASE_URL}/study/youtube`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });

      const data = await res.json();
      setVideos(data.youtube_links || []);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch YouTube videos");
    } finally {
      setLoading(false);
    }
  }

  function saveVideos() {
    const output = videos
      .map((v, i) => `${i + 1}. ${v.title} — ${v.url}`)
      .join("\n");

    saveItem({
      id: Date.now(),
      feature: "YouTube Learning",
      input: text,
      output,
      timestamp: new Date().toLocaleString(),
    });

    alert("YouTube resources saved!");
  }

  return (
    <div className="max-w-4xl">
      <h1 className="text-2xl font-semibold mb-4">📺 YouTube Learning</h1>

      <textarea
        className="w-full h-28 p-4 border rounded-lg mb-4"
        placeholder="Enter a topic (e.g., Photosynthesis, Linear Algebra)"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <button
        onClick={getVideos}
        disabled={loading}
        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? "Searching..." : "Get YouTube Videos"}
      </button>

      {/* Video Results */}
      {videos.length > 0 && (
        <div className="mt-6 space-y-4">
          {videos.map((v, i) => (
            <div
              key={i}
              className="bg-white border rounded-lg p-4"
            >
              <p className="font-medium">
                {i + 1}. {v.title}
              </p>
              <a
                href={v.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 text-sm hover:underline"
              >
                Watch on YouTube
              </a>
            </div>
          ))}

          <button
            onClick={saveVideos}
            className="mt-4 px-4 py-2 border rounded-lg hover:bg-slate-100"
          >
            ⭐ Save Resources
          </button>
        </div>
      )}
    </div>
  );
}
