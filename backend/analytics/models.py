from sqlalchemy import Column, Integer, Float

from auth.models import Base


class AnalyticsSummary(Base):

    __tablename__ = "analytics_summary"

    id = Column(Integer, primary_key=True, index=True)

    total_requests = Column(Integer, default=0)

    completed_rides = Column(Integer, default=0)

    total_revenue = Column(Float, default=0.0)

    average_fare = Column(Float, default=0.0)