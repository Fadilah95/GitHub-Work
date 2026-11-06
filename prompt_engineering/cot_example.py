
import os
from dotenv import load_dotenv
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.prompts import PromptTemplate
from langchain_core.output_parsers import StrOutputParser

# Step 1: Load Gemini API Key
load_dotenv()

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

if not GEMINI_API_KEY:
    raise ValueError("GEMINI_API_KEY not found in .env file")

# Step 2: Initialize Gemini
llm = ChatGoogleGenerativeAI(
    model="gemini-3.5-flash-lite",
    api_key=GEMINI_API_KEY
)

# Step 3: Chain-of-Thought Prompt Template
prompt_template = """

Now, solve this new problem using the same step-by-step approach:
Question: {question}
Answer:
"""

# Step 4: Create PromptTemplate
prompt = PromptTemplate(
    input_variables=["question"],
    template=prompt_template
)

# Step 5: Create LangChain Pipeline
chain = prompt | llm | StrOutputParser()

# Step 6: Function to Solve Math Problem
def solve_math_problem(problem):
    try:
        response = chain.invoke({"question": problem})
        print(f"Problem: {problem}\n")
        print(f"Solution:\n{response}\n")
        print("-" * 50 + "\n")

    except Exception as e:
        print(f"An error occurred: {str(e)}")

# Step 7: New Math Problem
new_problem = """5 people can create 5 donuts every 5 minutes.
How much time would it take 25 people to make 100 donuts?
Return the answer immediately."""

# Step 8: Run the Function
solve_math_problem(new_problem)
