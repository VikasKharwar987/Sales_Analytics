from fastapi import APIRouter
from pydantic import BaseModel
from sqlalchemy.orm import Session
from fastapi import Depends

from app.database import get_db
from app.models import PredictionHistory

import joblib
import pandas as pd

router = APIRouter()

# Load trained model
model = joblib.load("models/sales_forecast_model.pkl")

# Load feature column names
feature_columns = joblib.load("models/feature_columns.pkl")


class PredictionRequest(BaseModel):

    Store: int
    DayOfWeek: int
    Open: int
    Promo: int
    StateHoliday: str
    SchoolHoliday: int
    StoreType: str
    Assortment: str
    CompetitionDistance: float
    CompetitionOpenSinceMonth: int
    CompetitionOpenSinceYear: int
    Promo2: int
    Promo2SinceWeek: int
    Promo2SinceYear: int
    PromoInterval: str
    Customers: int
    Date: str


@router.post("/predict")
def predict_sales(data: PredictionRequest, db: Session = Depends(get_db)):

    df = pd.DataFrame([data.model_dump()])

    # Convert Date
    df["Date"] = pd.to_datetime(df["Date"])

    df["Year"] = df["Date"].dt.year
    df["Month"] = df["Date"].dt.month
    df["Day"] = df["Date"].dt.day
    df["Week"] = df["Date"].dt.isocalendar().week.astype(int)
    df["DayOfYear"] = df["Date"].dt.dayofyear

    df.drop("Date", axis=1, inplace=True)

    # One-hot encoding
    df = pd.get_dummies(df)

    # Match training columns
    df = df.reindex(columns=feature_columns, fill_value=0)

    prediction = model.predict(df)[0]
    history = PredictionHistory(
        Store=data.Store,
        ForecastDate=pd.to_datetime(data.Date).date(),
        PredictedSales=float(prediction)
    )

    db.add(history)
    db.commit()

    return {
        "predicted_sales": round(float(prediction), 2)
    }