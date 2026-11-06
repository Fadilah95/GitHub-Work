# exercise_2.py: FastAPI endpoint for PDF RAG
from fastapi.responses import FileResponse
from pathlib import Path
import os
from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException, Query
from pymongo import MongoClient
from langchain_mongodb import MongoDBAtlasVectorSearch
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.runnables import RunnablePassthrough
from langchain_core.output_parsers import StrOutputParser
from embeddings import embeddings

# Load environment variables
load_dotenv()

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
MONGODB_URI = os.getenv("MONGODB_ATLAS_CLUSTER_URI")

# Initialize FastAPI
app = FastAPI(
    title="SediaNiaga PDF RAG API",
    description="Ask questions based on the PDF using RAG",
    version="1.0.0"
)

# Initialize Gemini LLM
llm = ChatGoogleGenerativeAI(
    model="gemini-3.5-flash-lite",
    api_key=GEMINI_API_KEY,
    max_retries=2
)

# Connect to MongoDB Atlas
client = MongoClient(MONGODB_URI)

DB_NAME = "test_db"
COLLECTION_NAME = "test_collection_pdf"
ATLAS_VECTOR_SEARCH_INDEX_NAME = "test-index-pdf"

MONGODB_COLLECTION = client[DB_NAME][COLLECTION_NAME]

# Create vector store
vector_store = MongoDBAtlasVectorSearch(
    collection=MONGODB_COLLECTION,
    embedding=embeddings,
    index_name=ATLAS_VECTOR_SEARCH_INDEX_NAME,
    relevance_score_fn="cosine",
)

# Retrieve the top 10 relevant chunks
retriever = vector_store.as_retriever(
    search_kwargs={"k": 10}
)

# Define the system prompt
system_prompt = """
You are a helpful AI assistant for SediaNiaga.

Answer questions using only the information
provided in the PDF context below.

Do not use external knowledge.
Do not make up information.

If the answer cannot be found in the context,
say "The information is not available in the PDF."

Provide clear, accurate, and concise answers.

Context:
{context}
"""

prompt = ChatPromptTemplate.from_messages([
    ("system", system_prompt),
    ("human", "{input}"),
])

# Format retrieved documents
def format_docs(docs):
    return "\n\n".join(
        doc.page_content for doc in docs
    )

# Build RAG chain
rag_chain = (
    {
        "context": retriever | format_docs,
        "input": RunnablePassthrough()
    }
    | prompt
    | llm
    | StrOutputParser()
)

# Home endpoint
@app.get("/")
def home():
    return {
        "message": "SediaNiaga PDF RAG API is running"
    }

# Exercise 2: GET endpoint
@app.get("/ask")
def ask_question(
    question: str = Query(
        ...,
        min_length=1,
        description="Enter your question about the PDF"
    )
):
    try:
        response = rag_chain.invoke(question)

        return {
            "question": question,
            "answer": response
        }

    except Exception as e:
        print(f"RAG Error: {type(e).__name__}: {e}")

        raise HTTPException(
            status_code=503,
            detail="RAG service is unavailable. Check the server terminal."
        )

# Exercise 3: Serve the chatbot frontend

@app.get("/chat")
def chat_page():
    html_path = Path(__file__).parent / "index.html"
    return FileResponse(html_path)