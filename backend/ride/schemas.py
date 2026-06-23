from pydantic import BaseModel


class RideCreate(BaseModel):

    pickup_location: str

    drop_location: str