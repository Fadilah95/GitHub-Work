
import os
import time
from dotenv import load_dotenv
from google import genai
from google.genai import types

load_dotenv()

api_key = os.getenv("GEMINI_API_KEY")
if not api_key:
    raise RuntimeError("GEMINI_API_KEY tidak dijumpai.")

client = genai.Client(
    api_key=api_key,
    http_options=types.HttpOptions(timeout=15000)
)

print("Checking available Gemini models...", flush=True)

try:
    models = [
        m.name.replace("models/", "")
        for m in client.models.list()
        if "generateContent" in (m.supported_actions or [])
    ]

    print("Available models:")
    for model in models:
        print("-", model)

    preferred = [
        "gemini-3.1-flash-lite"
    ]

    model_name = next(
        (name for name in preferred if name in models),
        None
    )

    if not model_name:
        print("No preferred model found. Check the list above.")
    else:
        print(f"\nTesting model: {model_name}", flush=True)

        start = time.perf_counter()

        response = client.models.generate_content(
            model=model_name,
            contents="Translate 'I like programming' into German. Return only the translation.",
            config=types.GenerateContentConfig(
                max_output_tokens=100,
                temperature=0
            )
        )

        elapsed = time.perf_counter() - start

        print(f"Response: {response.text}")
        print(f"Time: {elapsed:.2f} seconds")

except Exception as e:
    print(f"ERROR: {type(e).__name__}: {e}")

finally:
    client.close()
