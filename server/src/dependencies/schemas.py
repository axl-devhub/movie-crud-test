from pydantic import BaseModel
from typing import List, Optional, Union, ForwardRef
from datetime import datetime, date


class MovieBase(BaseModel):
    title: str
    year: int
    sinopsis: str
    rating: float
    director: str
    budget: float
    revenue: float


class MovieCreate(MovieBase):
    pass    

class MovieUpdate(MovieBase):
    image: str


class Movie(MovieBase):
    id: int
    image: str
    created_at: datetime

    class Config:
        from_attributes = True


class ActorBase(BaseModel):
    name: str
    image: str
    birthdate: date


class ActorCreate(ActorBase):
    pass


class Actor(ActorBase):
    id: int
    created_at: datetime
    movies: Optional[List[Movie]] = []

    class Config:
        from_attributes = True
