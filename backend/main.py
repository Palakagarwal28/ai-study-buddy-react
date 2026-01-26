from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
import pytesseract
import io
import os
from groq import Groq
from dotenv import load_dotenv
from pydantic import BaseModel
import json
from pydantic import BaseModel
from PIL import Image
from auth import router as auth_router
from database import engine
from models import Base
import cv2
import numpy as np



# Initialize FastAPI
app = FastAPI()

Base.metadata.create_all(bind=engine)

app.include_router(auth_router)

# Enable CORS (frontend connection)
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "https://ai-study-buddy-react-99vf27y84-palak-agarwals-projects-40c33464.vercel.app",
        "https://ai-study-buddy-react.onrender.com",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.options("/{path:path}")
async def options_handler(path: str):
    return {}

import asyncio

async def extract_text_from_upload(file: UploadFile) -> str:
    try:
        print("🖼️ Reading image bytes...")
        image_bytes = await file.read()

        print("🔄 Converting to OpenCV image...")
        np_img = np.frombuffer(image_bytes, np.uint8)
        image = cv2.imdecode(np_img, cv2.IMREAD_GRAYSCALE)

        print("📐 Resizing image...")
        image = cv2.resize(image, None, fx=2, fy=2, interpolation=cv2.INTER_CUBIC)

        print("⚫ Thresholding image...")
        _, image = cv2.threshold(image, 150, 255, cv2.THRESH_BINARY)

        custom_config = (
            r'--oem 3 --psm 6 '
            r'-c tessedit_char_whitelist=0123456789xyXY+-=*/()=.'
        )

        print("🧠 Running Tesseract OCR...")

        # Run OCR in thread with timeout protection
        text = await asyncio.to_thread(
            pytesseract.image_to_string,
            image,
            config=custom_config
        )

        print("📄 OCR result:", text)

        return text.strip()

    except Exception as e:
        print("❌ OCR FAILURE:", e)
        return ""


class MathRequest(BaseModel):
    problem: str
    mode: str
    step_by_step: bool = True

class StudyRequest(BaseModel):
    text: str


# Load environment variables
load_dotenv()




# Initialize Groq client
client = Groq(api_key=os.getenv("GROQ_API_KEY"))
def call_ai(system_prompt: str, user_prompt: str) -> str:
    response = client.chat.completions.create(
        model="llama-3.1-8b-instant",
        messages=[
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": user_prompt},
        ]
    )
    return response.choices[0].message.content

@app.get("/")
def root():
    return {"message": "AI Study Buddy Backend Running"}


@app.post("/study/summary")
async def generate_summary(request: StudyRequest):
    text = request.text

    prompt = f"""
    Explain the following topic in deep detail.

    Include:
    - definition
    - history
    - main concepts
    - tools and libraries
    - real world uses
    - examples
    - advantages and disadvantages

    Write in structured sections with headings.

    Topic:
    {text}
    """

    response = client.chat.completions.create(
        model="llama-3.1-8b-instant",
        messages=[
            {"role": "user", "content": summary_prompt}
        ],
    )

    return {"summary": response.choices[0].message.content}

import json

@app.post("/study/quiz")
async def generate_quiz(request: StudyRequest):
    text = request.text

    quiz_prompt = f"""
Create exactly 5 multiple-choice questions from the text below.

Rules:
- Each question must have exactly 4 options
- Only one correct answer
- Return ONLY valid JSON
- Do not add explanations or markdown

JSON format:
{{
  "quiz": [
    {{
      "question": "Question text",
      "options": ["Option A", "Option B", "Option C", "Option D"],
      "answer": 0
    }}
  ]
}}

Text:
{text}
"""

    response = client.chat.completions.create(
        model="llama-3.1-8b-instant",
        messages=[
            {"role": "user", "content": quiz_prompt}
        ],
    )

    return json.loads(response.choices[0].message.content)

class FlashcardRequest(BaseModel):
    text: str

@app.post("/study/flashcards")
async def generate_flashcards(req: FlashcardRequest):
    prompt = f"""
You are an AI that creates study flashcards.

From the text below, generate 5 flashcards.

⚠️ VERY IMPORTANT:
- Respond ONLY in valid JSON
- Do NOT include explanations
- Do NOT include extra text

JSON format:
{{
  "flashcards": [
    {{ "question": "...", "answer": "..." }},
    {{ "question": "...", "answer": "..." }}
  ]
}}

Text:
{req.text}
"""

    response = client.chat.completions.create(
        model="llama-3.1-8b-instant",
        messages=[
            {"role": "system", "content": "You generate structured flashcards in JSON."},
            {"role": "user", "content": prompt},
        ],
    )

    content = response.choices[0].message.content

    try:
        parsed = json.loads(content)
        return parsed
    except Exception as e:
        print("FLASHCARD JSON PARSE ERROR:", e)
        return {
            "flashcards": []
        }

import json
import urllib.parse

@app.post("/study/youtube")
async def generate_youtube_links(request: StudyRequest):
    text = request.text

    prompt = f"""
From the topic or text below, suggest 5 useful YouTube search queries
that a student can use to learn the topic.

Rules:
- Return ONLY valid JSON
- Do not include explanations
- Do not include markdown

JSON format:
{{
  "topics": [
    "search query 1",
    "search query 2",
    "search query 3"
  ]
}}

Text:
{text}
"""

    response = client.chat.completions.create(
        model="llama-3.1-8b-instant",
        messages=[{"role": "user", "content": prompt}]
    )

    data = json.loads(response.choices[0].message.content)

    youtube_links = []
    for q in data["topics"]:
        query = urllib.parse.quote(q)
        youtube_links.append({
            "title": q,
            "url": f"https://www.youtube.com/results?search_query={query}"
        })

    return {"youtube_links": youtube_links}
@app.post("/study/math")
async def solve_math(req: MathRequest):
    try:
        mode = req.mode if req.mode in ["answer", "explain"] else "explain"

        if mode == "answer":
            prompt = f"""
You are a calculator.

Return ONLY the final answer.
No explanation. No steps. No words.

Problem:
{req.problem}
"""
        else:
            prompt = f"""
You are a professional mathematics tutor.

Solve step by step.

## Problem
{req.problem}

## Solution
### Step 1
...

## Final Answer
(answer)
"""

        solution = call_ai(
            "You solve math accurately.",
            prompt
        )

        return {"solution": solution.strip()}

    except Exception as e:
        print("❌ MATH TEXT ERROR:", e)
        return {"solution": "Math solver failed."}



from fastapi import UploadFile, File

@app.post("/study/math/image")
async def solve_math_from_image(file: UploadFile = File(...)):
    try:
        print("📸 Math image received:", file.filename)

        text = await extract_text_from_upload(file)
        print("🧮 OCR math text:", text)

        if not text:
            return {"solution": "Could not detect a math problem in the image."}

        prompt = f"""
Solve this math problem step by step.

Use this exact format:

## Problem
{text}

## Solution
### Step 1
...

### Step 2
...

## Final Answer
(answer)
"""

        solution = call_ai(
            "You are a professional mathematics tutor.",
            prompt
        )

        print("✅ Math image solved")

        return {
            "problem": text,
            "solution": solution
        }

    except Exception as e:
        print("❌ MATH IMAGE ERROR:", e)
        return {"solution": "Failed to solve math from image."}



@app.post("/study/image")
async def study_from_image(file: UploadFile = File(...)):
    try:
        print("📸 Received image:", file.filename)

        contents = await file.read()
        image = Image.open(io.BytesIO(contents))

        print("🖼 Image loaded")

        extracted_text = pytesseract.image_to_string(image)

        print("📄 OCR output:", extracted_text)

        if not extracted_text.strip():
            return {
                "explanation": "No readable text found in the image."
            }

        response = client.chat.completions.create(
            model="llama-3.1-8b-instant",
            messages=[
                {
                    "role": "system",
                    "content": "Explain the text extracted from the image simply for a student."
                },
                {
                    "role": "user",
                    "content": extracted_text
                }
            ]
        )

        explanation = response.choices[0].message.content

        return {
            "extracted_text": extracted_text,
            "explanation": explanation
        }

    except Exception as e:
        print("❌ IMAGE PROCESSING FAILED:", e)
        return {
            "explanation": f"Image processing failed: {str(e)}"
        }

   
