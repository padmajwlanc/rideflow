# driver/models.py

from sqlalchemy import Column
from sqlalchemy import Integer
from sqlalchemy import String
from sqlalchemy import Float
from sqlalchemy import ForeignKey

from auth.models import Base


class Driver(Base):

    __tablename__ = "drivers"

    id = Column(Integer, primary_key=True)

    user_id = Column(
        Integer,
        ForeignKey("users.id"),
        unique=True
    )

    license_number = Column(String)

    vehicle_type = Column(String)

    vehicle_number = Column(String)

    rating = Column(
        Float,
        default=5.0
    )

    is_available = Column(
        String,
        default="offline"
    )