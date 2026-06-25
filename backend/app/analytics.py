from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import text

from app.database import get_db

router = APIRouter()

def get_sales_trend(db: Session):
    query = text("""
        SELECT
            EXTRACT(YEAR FROM "Date") AS year,
            EXTRACT(MONTH FROM "Date") AS month,
            SUM("Sales") AS total_sales
        FROM sales_records
        GROUP BY
            year,
            month
        ORDER BY
            year,
            month
    """)
    result = db.execute(query)
    sales_trend = []
    for row in result:
        sales_trend.append({
            "year": int(row.year),
            "month": int(row.month),
            "sales": float(row.total_sales)
        })
    return sales_trend

@router.get("/dashboard")
def dashboard(db: Session = Depends(get_db)):
    total_sales = db.execute(
        text("SELECT SUM(\"Sales\") FROM sales_records")
    ).scalar()
    average_sales = db.execute(
        text("SELECT AVG(\"Sales\") FROM sales_records")
    ).scalar()
    total_stores = db.execute(
        text("SELECT COUNT(*) FROM stores")
    ).scalar()
    total_records = db.execute(
        text("SELECT COUNT(*) FROM sales_records")
    ).scalar()
    average_customers = db.execute(
        text("SELECT AVG(\"Customers\") FROM sales_records")
    ).scalar()
    promotion_rate = db.execute(
        text("""
        SELECT
        AVG("Promo")*100
        FROM sales_records
        """)
    ).scalar()
    sales_trend = get_sales_trend(db)

    return {
        "kpis": {
            "total_sales": round(total_sales,2),
            "average_sales": round(average_sales,2),
            "total_stores": total_stores,
            "total_records": total_records,
            "average_customers": round(average_customers,2),
            "promotion_rate": round(promotion_rate,2)
    },
    "sales_trend": sales_trend
}