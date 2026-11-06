# exercise_1.py: create a new vector store for PDF
import os
from dotenv import load_dotenv
from pymongo import MongoClient
from langchain_mongodb import MongoDBAtlasVectorSearch
from embeddings import embeddings

# Load environment variables
load_dotenv()

MONGODB_URI = os.getenv("MONGODB_ATLAS_CLUSTER_URI")

# Connect to MongoDB
client = MongoClient(MONGODB_URI)

# Define database and collection names
DB_NAME = "test_db"
COLLECTION_NAME = "test_collection_pdf"
ATLAS_VECTOR_SEARCH_INDEX_NAME = "test-index-pdf"

MONGODB_COLLECTION = client[DB_NAME][COLLECTION_NAME]

# Instantiate the vector store
vector_store = MongoDBAtlasVectorSearch(
    collection=MONGODB_COLLECTION,
    embedding=embeddings,
    index_name=ATLAS_VECTOR_SEARCH_INDEX_NAME,
    relevance_score_fn="cosine",
)

# Create the vector search index
print("Creating PDF vector search index...")

vector_store.create_vector_search_index(
    dimensions=768,
    wait_until_complete=60
)

print("PDF Vector Store Created!")

# Close MongoDB connection
client.close()
