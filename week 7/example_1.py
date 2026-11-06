# import os
# from dotenv import load_dotenv
# from langchain_google_genai import ChatGoogleGenerativeAI
# from langchain_core.output_parsers import StrOutputParser

# load_dotenv()
# GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
# llm = ChatGoogleGenerativeAI(model="gemini-3.8-flash", api_key=GEMINI_API_KEY)

# messages = [
#     (
#         "system",
#         "You are a helpful assistant that translates English to German. Translate the provided sentence only."
#     ),
#     (
#         "human",
#         "I like programming."
#     ),
# ]

# chain = llm | StrOutputParser()
# ai_msg = chain.invoke(messages)
# print(ai_msg)


import os
from dotenv import load_dotenv
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser

load_dotenv()
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
llm = ChatGoogleGenerativeAI(model="gemini-3.8-flash", api_key=GEMINI_API_KEY)

prompt = ChatPromptTemplate.from_messages(
    [
        (
            "system",
            "You are a helpful assistant that translates {input_language} to {output_language}."
        ),
        (
            "human",
            "{input}"
        ),
    ]
)

chain = prompt | llm | StrOutputParser()

ai_msg = chain.invoke({
    "input_language": "English",
    "output_language": "German",
    "input": "Hello world!"
})

print(ai_msg)
