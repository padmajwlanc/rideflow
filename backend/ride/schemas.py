from pydantic import BaseModel


class RideCreate(BaseModel):

    pickup_latitude: float

    pickup_longitude: float

    drop_latitude: float

    drop_longitude: float