import os

from dotenv import load_dotenv

from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base
from sqlalchemy.orm import sessionmaker

# Load environment variables
load_dotenv()

# Read database URL
DATABASE_URL = os.getenv("DATABASE_URL")

# Create connection engine
engine = create_engine(DATABASE_URL)

# Create database session
SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine
)

# Base class for all database tables
Base = declarative_base()

def get_db():

    db = SessionLocal()

    try:
        yield db

    finally:
        db.close()