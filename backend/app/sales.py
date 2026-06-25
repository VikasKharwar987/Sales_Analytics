from fastapi import APIRouter, Depends
from pydantic import BaseModel
from sqlalchemy.orm import Session

from app.database import get_db
from app.models import SalesRecord

import pandas as pd

router = APIRouter()


class SalesRequest(BaseModel):

    Store: int
    DayOfWeek: int
    Date: str
    Sales: int
    Customers: int
    Open: int
    Promo: int
    StateHoliday: str
    SchoolHoliday: int


@router.post("/sales")
def add_sales_record(
    data: SalesRequest,
    db: Session = Depends(get_db)
):

    sales = SalesRecord(

        Store=data.Store,
        DayOfWeek=data.DayOfWeek,
        Date=pd.to_datetime(data.Date).date(),
        Sales=data.Sales,
        Customers=data.Customers,
        Open=data.Open,
        Promo=data.Promo,
        StateHoliday=data.StateHoliday,
        SchoolHoliday=data.SchoolHoliday

    )

    db.add(sales)
    db.commit()

    return {
        "message": "Sales record added successfully"
    }