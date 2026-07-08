from sqlalchemy import Column
from sqlalchemy import Integer
from sqlalchemy import String
from sqlalchemy import ForeignKey
from sqlalchemy import Float

from auth.models import Base


class Ride(Base):

    __tablename__ = "rides"

    id = Column(
        Integer,
        primary_key=True
    )

    rider_id = Column(
        Integer,
        ForeignKey("users.id")
    )

    driver_id = Column(
        Integer,
        ForeignKey("drivers.id"),
        nullable=True
    )

    pickup_latitude = Column(Float)

    pickup_longitude = Column(Float)

    drop_latitude = Column(Float)

    drop_longitude = Column(Float)

    fare = Column(
        Integer,
        default=0
    )

    status = Column(
        String,
        default="requested"
    )