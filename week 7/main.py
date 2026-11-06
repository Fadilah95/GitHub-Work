import os
import time

from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from google import genai
from google.genai import types

# Load API key
load_dotenv()

api_key = os.getenv("GEMINI_API_KEY")

if not api_key:
    raise RuntimeError("GEMINI_API_KEY not found in .env")

# Connect directly to Gemini
client = genai.Client(
    api_key=api_key,
    http_options=types.HttpOptions(timeout=15000)
)

# Create FastAPI application
app = FastAPI(title="Text Translator API")

# Allow React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173"
    ],
    allow_methods=["*"],
    allow_headers=["*"]
)

# Request body structure
class TranslationRequest(BaseModel):
    input_language: str
    output_language: str
    text_input: str

# Home endpoint
@app.get("/")
def home():
    return {"message": "Translation API is running"}

# Translation endpoint
@app.post("/translate")
def translate(request: TranslationRequest):

    if not request.text_input.strip():
        raise HTTPException(
            status_code=400,
            detail="Please enter text to translate."
        )

    prompt = (
        f"Translate the following text from "
        f"{request.input_language} to "
        f"{request.output_language}. "
        f"Return only the translated text:\n\n"
        f"{request.text_input}"
    )

    start = time.perf_counter()

    print("Starting Gemini translation...", flush=True)

    try:
        response = client.models.generate_content(
            model="gemini-3.1-flash-lite",
            contents=prompt,
            config=types.GenerateContentConfig(
                temperature=0,
                max_output_tokens=200
            )
        )

        if not response.text:
            raise ValueError("Gemini returned empty text")

        elapsed = time.perf_counter() - start

        print(
            f"Gemini success in {elapsed:.2f}s",
            flush=True
        )

        return {
            "translated_text": response.text.strip()
        }

    except Exception as e:
        elapsed = time.perf_counter() - start

        print(
            f"Gemini error after {elapsed:.2f}s: "
            f"{type(e).__name__}: {e}",
            flush=True
        )

        raise HTTPException(
            status_code=502,
            detail="Gemini translation failed."
        )
