import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SavedProvider } from "./context/SavedContext";
import { AuthProvider } from "./context/AuthContext";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";

import AppLayout from "./App/AppLayout";

import SummaryView from "./components/SummaryView";
import QuizView from "./components/QuizView";
import FlashcardView from "./components/FlashcardView";
import MathSolverView from "./components/MathSolverView";
import ImageUpload from "./components/ImageUpload";
import YouTubeView from "./components/YouTubeView";
import SavedSearches from "./components/SavedSearches";

import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* PUBLIC */}
        
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        

        {/* PROTECTED */}
        <Route
          path="/app"
          element={
            <ProtectedRoute>
              <AppLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/" element={<Home />} />
          <Route path="summary" element={<SummaryView />} />
          <Route path="quiz" element={<QuizView />} />
          <Route path="flashcards" element={<FlashcardView />} />
          <Route path="math" element={<MathSolverView />} />
          <Route path="image" element={<ImageUpload />} />
          <Route path="youtube" element={<YouTubeView />} />
          <Route path="saved" element={<SavedSearches />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}





