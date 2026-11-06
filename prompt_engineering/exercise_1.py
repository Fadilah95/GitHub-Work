
import os
from dotenv import load_dotenv
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.prompts import FewShotPromptTemplate, PromptTemplate
from langchain_core.output_parsers import StrOutputParser

# Step 1: Load environment variables
load_dotenv()

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

if not GEMINI_API_KEY:
    raise ValueError("GEMINI_API_KEY not found in .env file")

# Step 2: Initialize Gemini LLM
llm = ChatGoogleGenerativeAI(
    model="gemini-3.5-flash-lite",
    api_key=GEMINI_API_KEY
)

# Step 3: Few-Shot Examples
examples = [
    {
        "review": "The car detailing was excellent! My car looks brand new.",
        "sentiment": "Positive"
    },
    {
        "review": "The repair took too long and the price was too expensive.",
        "sentiment": "Negative"
    },
    {
        "review": "The car wash was okay. Nothing special.",
        "sentiment": "Neutral"
    },
    {
        "review": "The staff were friendly but the service was very slow.",
        "sentiment": "Mixed"
    },
    {
        "review": "My headlights look brand new. Great service!",
        "sentiment": "Positive"
    },
    {
        "review": "The coating looks good but the price is too high.",
        "sentiment": "Mixed"
    }
]

# Step 4: Create Example Prompt
example_prompt = PromptTemplate(
    input_variables=["review", "sentiment"],
    template="Customer Review: {review}\nSentiment: {sentiment}"
)

# Step 5: Create Few-Shot Prompt
prompt = FewShotPromptTemplate(
    examples=examples,
    example_prompt=example_prompt,

    # PREFIX: Define LLM role and instructions
    prefix=(
        "You are a customer sentiment analysis assistant "
        "for an automotive workshop.\n"
        "Analyze each customer review and classify its sentiment.\n"
        "Respond with ONLY ONE of these labels: "
        "Positive, Negative, Neutral, or Mixed.\n"
        "Do not provide any explanation.\n"
    ),

    # SUFFIX: Define how the LLM should respond
    suffix=(
        "Now analyze the following customer review.\n"
        "Customer Review: {input}\n"
        "Return ONLY the sentiment label "
        "(Positive, Negative, Neutral, or Mixed).\n"
        "Do not include explanations or extra text.\n"
        "Sentiment:"
    ),

    input_variables=["input"]
)

# Step 6: Create LangChain Pipeline
chain = prompt | llm | StrOutputParser()

# Step 7: User Interaction
print("Car Workshop Customer Review Sentiment Analyzer")
print("Type 'quit' to exit.")

while True:
    review = input("\nEnter customer review: ").strip()

    if not review:
        continue

    if review.lower() == "quit":
        break

    try:
        response = chain.invoke({"input": review})
        print("Sentiment:", response.strip())

    except Exception as e:
        print(f"Error: {e}")

print("\nProgram ended.")
