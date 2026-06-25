from sqlalchemy import Column
from sqlalchemy import Integer
from sqlalchemy import Float
from sqlalchemy import String
from sqlalchemy import Date
from sqlalchemy import DateTime
from datetime import datetime


from app.database import Base


class Store(Base):

    __tablename__ = "stores"
    Store = Column(Integer, primary_key=True)
    StoreType = Column(String)
    Assortment = Column(String)
    CompetitionDistance = Column(Float)
    CompetitionOpenSinceMonth = Column(Integer)
    CompetitionOpenSinceYear = Column(Integer)
    Promo2 = Column(Integer)
    Promo2SinceWeek = Column(Integer)
    Promo2SinceYear = Column(Integer)
    PromoInterval = Column(String)


class SalesRecord(Base):

    __tablename__ = "sales_records"
    ID = Column(Integer, primary_key=True, index=True)
    Store = Column(Integer)
    Date = Column(Date)
    DayOfWeek = Column(Integer)
    Sales = Column(Integer)
    Customers = Column(Integer)
    Open = Column(Integer)
    Promo = Column(Integer)
    StateHoliday = Column(String)
    SchoolHoliday = Column(Integer)


class PredictionHistory(Base):

    __tablename__ = "prediction_history"
    ID = Column(Integer, primary_key=True, index=True)
    Store = Column(Integer)
    ForecastDate = Column(Date)
    PredictedSales = Column(Float)
    CreatedAt = Column(DateTime, default=datetime.utcnow)