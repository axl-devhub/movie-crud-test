import enum
from sqlalchemy import (
    Boolean,
    Column,
    Integer,
    String,
    DateTime,
    ForeignKey,
    DECIMAL,
    Float,
    Text,
    Date,
    Enum,
    CheckConstraint,
)
from datetime import datetime
from typing import List, Type, Any, T
from sqlalchemy.orm import declarative_base, relationship
from sqlalchemy.orm import Session
from sqlalchemy.ext.hybrid import hybrid_property

Base = declarative_base()


class BaseMixin:
    created_at = Column(DateTime, default=datetime.now)

    @classmethod
    def update(cls: Type[T], db: Session, id: int, **kwargs: Any) -> T:
        try:
            db.query(cls).filter(cls.id == id).update(kwargs)
        except Exception as e:
            db.rollback()
            raise e
        else:
            db.commit()
            return db.query(cls).get(id)



class Movie(Base, BaseMixin):
    __tablename__ = "movie"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(255), index=True, unique=True)
    sinopsis = Column(Text)
    year = Column(Integer)
    rating = Column(Float)
    director = Column(String(255))
    image = Column(Text)
    budget = Column(DECIMAL)
    revenue = Column(DECIMAL)

    def __repr__(self):
        return self.title
    
    def __init__(self, title, year, rating, director, image, budget, revenue, sinopsis):
        self.title = title
        self.year = year
        self.rating = rating
        self.director = director
        self.image = image
        self.budget = budget
        self.revenue = revenue
        self.sinopsis = sinopsis
    
    actors = relationship("ActorMovies", back_populates="movie")



class Actor(Base, BaseMixin):
    __tablename__ = "actor"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), index=True)
    image = Column(Text)
    birthdate = Column(Date)

    def __repr__(self):
        return self.name
    
    def __init__(self, name, image, birthdate):
        self.name = name
        self.image = image
        self.birthdate = birthdate

    movies = relationship("ActorMovies", back_populates="actor")


class ActorMovies(Base, BaseMixin):
    __tablename__ = "actor_movies"

    id = Column(Integer, primary_key=True, index=True)
    actor_id = Column(Integer, ForeignKey("actor.id"))
    movie_id = Column(Integer, ForeignKey("movie.id"))

    actor = relationship("Actor", back_populates="movies")
    movie = relationship("Movie", back_populates="actors")


