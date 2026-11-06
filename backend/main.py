# from fastapi import FastAPI

# app = FastAPI()

# @app.get("/")
# async def read_root():
#     return {"message" : "Hello World!"}

from fastapi import FastAPI, Body

app = FastAPI()

BOOKS = [
    {"title": "Fourth Wing", "author": "Rebecca Yarros", "published_year": 2023},
    {"title": "On Freedom", "author": "Timothy Synder", "published_year": 2024},
    {"title": "It Starts with Us", "author": "Colleen Hoover", "published_year": 2022},
    {"title": "The Book of Bill", "author": "Alex Hirsh", "published_year": 2024},
    {"title": "On Tyranny", "author": "Timothy Synder", "published_year": 2017},
]

@app.get("/")
async def read_root():
    return {"message" : "Hello World!"}

@app.get("/books")
async def getAllBooks():
    return BOOKS

@app.get("/books/{book_title}")
async def get_book(book_title: str):
    for book in BOOKS:
        if book.get("title").casefold() == book_title.casefold():
            return book

        return "Book Not Found"

@app.get("books/")
async def get_book_by_query(author: str):
    books_to_return = []
    for book in BOOKS:
        if book.get("author").casefold() ==author.casefold():
            books_to_return.append(book)

    return books_to_return

@pp.get("/books/")
async def get_book_by_query(author: str, published_year: int):
    books_to_return = []
    for book in BOOKS:
        if book.get("author").casefold() == author.casefold() and \
                book.get("published_year") == published_year:
            books_to_return.append(book)

        return books_to_return
    