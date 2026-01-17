import React from "react";

import SummaryView from "../components/SummaryView";
import QuizView from "../components/QuizView";
import FlashcardView from "../components/FlashcardView";
import MathSolverView from "../components/MathSolverView";
import ImageUpload from "../components/ImageUpload";
import YouTubeView from "../components/YouTubeView";
import SavedSearches from "../components/SavedSearches";

export default function Workspace({ active }) {
  return (
    <div style={{ flex: 1, padding: 24 }}>
      {active === "Summary" && <SummaryView />}
      {active === "Quiz" && <QuizView />}
      {active === "Flashcards" && <FlashcardView />}
      {active === "Math" && <MathSolverView />}
      {active === "Image" && <ImageUpload />}
      {active === "YouTube" && <YouTubeView />}
      {active === "Saved" && <SavedSearches />}
    </div>
  );
}
