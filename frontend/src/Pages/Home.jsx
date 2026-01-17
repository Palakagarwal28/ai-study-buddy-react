import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";


export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-indigo-50 to-purple-50 flex items-center justify-center px-6">
      <div className="max-w-4xl w-full text-center fade-in">

        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 text-blue-700 text-sm font-semibold mb-6 slide-up delay-100">
          🌟 Your Friendly AI Study Buddy
        </div>

        {/* Heading */}
        <h1 className="text-4xl md:text-5xl font-bold text-slate-800 leading-tight mb-4 slide-up delay-200">
          Learn Smarter,
          <span className="block text-blue-600">One Step at a Time</span>
        </h1>

        {/* Subtitle */}
        <p className="text-lg text-slate-600 max-w-2xl mx-auto mb-8 slide-up delay-300">
          Get help with summaries, math, quizzes, flashcards, images, and videos —
          all in one calm, kid-friendly learning space.
        </p>

        {/* CTA Buttons */}
        <div className="flex justify-center gap-4 mb-12 slide-up delay-400">
          <Link
            to="/app/summary"
            className="px-6 py-3 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition inline-block"
          >
          Start Learning
          </Link>


          <Link
            to="/app/saved"
            className="px-6 py-3 rounded-lg bg-white border border-slate-300
              text-slate-700 font-semibold hover:bg-slate-100
              hover:-translate-y-0.5 transition-all duration-200 inline-block"
          >
            ⭐ Saved Searches
          </Link>


        </div>

        {/* Features */}
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
        <FeatureCard
         to="/app/summary"
         icon="📘"
         title="Smart Summaries"
         description="Turn long notes into short, easy summaries."
        />

        <FeatureCard
        to="/app/flashcards"
        icon="🧠"
        title="Flashcards"
        description="Memorize faster with AI-generated flashcards."
        />

        <FeatureCard
        to="/app/math"
        icon="🧮"
        title="Math Solver"
        description="Step-by-step help for math problems."
        />

        <FeatureCard
        to="/app/quiz"
        icon="❓"
        title="Fun Quizzes"
        description="Test what you learned with AI quizzes."
        />

        <FeatureCard
        to="/app/image"
        icon="🖼️"
        title="Image to Text"
        description="Upload images and extract text instantly."
        />

        <FeatureCard
        to="/app/youtube"
        icon="🎥"
        title="YouTube Learning"
        description="Learn faster with curated video explanations."
        />
    

        </div>
      </div>
    </div>
  );
}

function FeatureCard({ icon, title, description, to }) {
  return (
    <Link
      to={to}
      className="
        bg-white rounded-xl p-5 shadow-sm
        hover:shadow-lg hover:-translate-y-1
        transition-all duration-200
        block cursor-pointer
      "
    >
      <div className="text-2xl mb-3">{icon}</div>
      <h3 className="font-semibold text-slate-800 mb-1">{title}</h3>
      <p className="text-sm text-slate-600">{description}</p>
    </Link>
  );
}

 



