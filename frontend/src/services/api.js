const API_BASE = "http://127.0.0.1:5000";

export async function getSummary(text) {
  const res = await fetch(`${API_BASE}/study/summary`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text }),
  });

  if (!res.ok) {
    throw new Error("Failed to fetch summary");
  }

  return res.json();
}
