import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import Saved from "./Pages/Saved";
import AppPage from "./Pages/AppPage";
import AppLayout from "./App/AppLayout";

import { AuthProvider } from "./context/AuthContext";
import { SavedProvider } from "./context/SavedContext";
import ProtectedRoute from "./components/ProtectedRoute";

import SummaryView from "./components/SummaryView";
import QuizView from "./components/QuizView";
import FlashcardView from "./components/FlashcardView";
import MathSolverView from "./components/MathSolverView";
import ImageUpload from "./components/ImageUpload";
import YouTubeView from "./components/YouTubeView";
import SavedSearches from "./components/SavedSearches";

export default function App() {
  return (
    <AuthProvider>
      <SavedProvider>
        <BrowserRouter>
          <Routes>

            {/* Default Redirect */}
            <Route path="/" element={<Navigate to="/login" />} />

            {/* Auth Pages */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

            {/* Protected App Routes */}
            <Route
              path="/app"
              element={
                <ProtectedRoute>
                  <AppLayout />
                </ProtectedRoute>
              }
            >
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
      </SavedProvider>
    </AuthProvider>
  );
}



