from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, Form
from pydantic import parse_obj_as
from typing import List, Optional
from fastapi_pagination import Page
from fastapi_pagination.ext.sqlalchemy import paginate
from sqlalchemy import select
import json

from sqlalchemy.orm import Session, joinedload
from ..dependencies.database import get_db
from ..dependencies.schemas import Movie as MovieSchema, MovieCreate, Actor as ActorSchema, MovieUpdate
from ..dependencies.models import Movie, Actor, ActorMovies
import os
import shutil


router = APIRouter(tags=["Movies"])

@router.get("/movies", response_model=Page[MovieSchema])
def get_movies(
    db: Session = Depends(get_db),
    search: Optional[str] = None,
    min_rating: Optional[float] = None,
    max_rating: Optional[float] = None,
):
    try:
        if search:
            return paginate(
                db,
                select(Movie)
                .filter(Movie.title.ilike(f"%{search}%")),
            )
        if min_rating and max_rating:
            return paginate(
                db,
                select(Movie)
                .filter(Movie.rating >= min_rating)
                .filter(Movie.rating <= max_rating),
            )
        return paginate(
            db,
            select(Movie)
            .order_by(Movie.title),
        )
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
    

@router.post("/movies", response_model=MovieSchema)
def create_movie(
    image: UploadFile, 
    movie: str = Form(...),
    db: Session = Depends(get_db),
):
    try:
        # Parse the movie field as a MovieCreate object
        movie_data = json.loads(movie)
        movie_obj = parse_obj_as(MovieCreate, movie_data)

        # TODO Manage file upload and saving locally
        path = f'public/{image.filename}'
        
        # Create the directory if it does not exist
        os.makedirs(os.path.dirname(path), exist_ok=True)
        
        with open("src/"+path, "wb") as file:
            shutil.copyfileobj(image.file, file)
        
        movie_dict =  movie_obj.model_dump()
        movie_dict['image'] = path
        db_movie = Movie(**movie_dict)
        db.add(db_movie)
        db.commit()
        db.refresh(db_movie)
        return db_movie
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
    

    

@router.get("/movies/{movie_id}", response_model=MovieSchema)
def get_movie(
    movie_id: int,
    db: Session = Depends(get_db),
):
    try:
        return db.query(Movie).get(movie_id)
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
    

@router.put("/movies/{movie_id}", response_model=MovieSchema)
async def update_movie(
    movie_id: int,
    movie: str = Form(...),
    image: UploadFile = None,
    db: Session = Depends(get_db),
):
    try:
        # Fetch the existing movie
        movie_data = json.loads(movie)
        movie_obj = parse_obj_as(MovieCreate, movie_data)
        
        existing_movie = db.query(Movie).filter(Movie.id == movie_id).first()

        if not existing_movie:
            raise HTTPException(status_code=404, detail="Movie not found")

        # If a new image is provided
        if image:
            # Delete the old image file
            if os.path.isfile(existing_movie.image):
                os.remove(existing_movie.image)

            # Save the new image file
            new_image_path = f"public/{image.filename}"
            with open("src/"+new_image_path, "wb") as file:
                shutil.copyfileobj(image.file, file)

            if os.path.isfile(existing_movie.image):
                os.remove(existing_movie.image)

            movie_obj = MovieUpdate(**movie_obj.model_dump(), image=new_image_path)

        return Movie.update(db, movie_id, **movie_obj.model_dump())
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
    

@router.delete("/movies/{movie_id}")
def delete_movie(
    movie_id: int,
    db: Session = Depends(get_db),
):
    try:
        # Fetch the existing movie
        existing_movie = db.query(Movie).filter(Movie.id == movie_id).first()

        if not existing_movie:
            raise HTTPException(status_code=404, detail="Movie not found")

        # Delete the image file
        if os.path.isfile(existing_movie.image):
            os.remove(existing_movie.image)

        # Delete the movie from the database
        db.delete(existing_movie)
        db.commit()

        return {"message": "Movie deleted"}
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=400, detail=str(e))
    