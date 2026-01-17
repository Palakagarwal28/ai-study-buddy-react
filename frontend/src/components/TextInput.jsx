import React from "react";

export default function TextInput({ text, setText }) {
  return (
    <textarea
      className="w-full max-w-4xl mx-auto block mt-6 p-4 border rounded-xl"
      rows={6}
      placeholder="Paste your study material here..."
      value={text}
      onChange={(e) => setText(e.target.value)}
    />
  );
}