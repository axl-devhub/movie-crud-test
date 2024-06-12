from typing import Union, List

from fastapi import FastAPI, HTTPException, Depends
from pydantic import BaseModel

from fastapi.middleware.cors import CORSMiddleware
from fastapi_pagination import add_pagination
from fastapi.staticfiles import StaticFiles


app = FastAPI()
add_pagination(app)

from .routers.movies import router as movies_router

app.include_router(movies_router)

origins = ["*"]


@app.get("/")
def read_root():
    return {"Hello": "World"}


app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

import os

app.mount("/public", StaticFiles(directory=os.path.join(os.path.dirname(__file__), "public")), name="public")