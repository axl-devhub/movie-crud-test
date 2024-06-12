from sqlalchemy import create_engine, inspect
from sqlalchemy.orm import sessionmaker, declarative_base
from sqlalchemy_utils import database_exists, create_database, drop_database
import os
from dotenv import load_dotenv


load_dotenv()
DATABASE_URL = os.getenv("DATABASE_URL")
print(DATABASE_URL)
engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
inspection = inspect(engine)

# Import your models here
from .models import *
from .models import Base


if not database_exists(engine.url) or not inspection.get_table_names():
    if database_exists(engine.url):
        print("Database already exists, dropping it.")
        drop_database(engine.url)
    create_database(engine.url)
    Base.metadata.create_all(bind=engine)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
