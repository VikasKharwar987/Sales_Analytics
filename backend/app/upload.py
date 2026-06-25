from fastapi import APIRouter
from fastapi import UploadFile
from fastapi import File

import pandas as pd

from app.database import engine
from sqlalchemy import text

router = APIRouter()


@router.post("/upload")
def upload_dataset(store_file: UploadFile = File(...),sales_file: UploadFile = File(...)):
    store_df = pd.read_csv(store_file.file)
    sales_df = pd.read_csv(sales_file.file)

    if "Store" not in store_df.columns:
        return {"error": "Store column missing in store.csv"}

    if "Sales" not in sales_df.columns:
        return {"error": "Sales column missing in train.csv"}

    with engine.begin() as connection:

        connection.execute(
            text("DELETE FROM sales_records")
        )

        connection.execute(
            text("DELETE FROM stores")
        )
    store_df.to_sql(
        "stores",
        engine,
        if_exists="append",
        index=False
    )

    sales_df.to_sql(
        "sales_records",
        engine,
        if_exists="append",
        index=False
    )

    return {
        "message": "Dataset uploaded successfully",
        "stores": len(store_df),
        "sales_records": len(sales_df)
    }