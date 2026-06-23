from sqlalchemy import Column
from sqlalchemy import Integer
from sqlalchemy import String
from sqlalchemy import ForeignKey

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

    pickup_location = Column(String)

    drop_location = Column(String)

    fare = Column(
        Integer,
        default=0
    )

    status = Column(
        String,
        default="requested"
    )