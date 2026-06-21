from pydantic import BaseModel
from enum import Enum


class VehicleType(str, Enum):
    sedan = "Sedan"
    suv = "SUV"
    hatchback = "Hatchback"
    bike = "Bike"
    auto = "Auto"


class DriverCreate(BaseModel):

    license_number: str

    vehicle_type: VehicleType

    vehicle_number: str

class DriverStatus(str, Enum):
    online = "online"
    offline = "offline"