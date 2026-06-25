from fastapi import FastAPI
from app.database import Base, engine
from app import models

from app.upload import router as upload_router
from app.analytics import router as analytics_router
from app.prediction import router as prediction_router
from app.sales import router as sales_router

app = FastAPI(
    title="Analyatics AI",
    version="1.0.0",
    description="Retail Analytics & Sales Forecasting Platform"
)
Base.metadata.create_all(bind=engine)
app.include_router(upload_router)
app.include_router(analytics_router)
app.include_router(prediction_router)
app.include_router(sales_router)

@app.get("/")
def home():
    return{
        "message": "Welcome to Analyatics AI"
    }

@app.get("/health")
def health():
    return{
        "message":"Backend is working"
    }