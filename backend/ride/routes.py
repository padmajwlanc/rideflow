from fastapi import APIRouter
from fastapi import Depends

from sqlalchemy.orm import Session

from ride.models import Ride
from ride.schemas import RideCreate

from auth.dependencies import get_current_user
from auth.models import User

from database.db import get_db
from driver.models import Driver

from utils.distance import calculate_distance

router = APIRouter(
    prefix="/ride",
    tags=["Ride"]
)

@router.post("/request")
def request_ride(
    ride: RideCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):

    new_ride = Ride(
        rider_id=current_user.id,
        pickup_latitude=ride.pickup_latitude,
        pickup_longitude=ride.pickup_longitude,

        drop_latitude=ride.drop_latitude,
        drop_longitude=ride.drop_longitude
    )

    db.add(new_ride)

    db.commit()

    db.refresh(new_ride)

    return {
        "message": "Ride requested successfully",
        "ride_id": new_ride.id,
        "status": new_ride.status
    }

@router.get("/history")
def ride_history(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):

    rides = db.query(Ride).filter(
        Ride.rider_id == current_user.id
    ).all()

    return rides

@router.post("/assign/{ride_id}")
def assign_driver(
    ride_id: int,
    db: Session = Depends(get_db)
):

    ride = db.query(Ride).filter(
        Ride.id == ride_id
    ).first()

    if not ride:
        return {
            "message": "Ride not found"
        }

    online_drivers = db.query(Driver).filter(
        Driver.is_available == "online"
    ).all()

    if not online_drivers:
        return {
            "message": "No drivers available"
        }

    nearest_driver = None
    shortest_distance = float("inf")

    for driver in online_drivers:

        if driver.latitude is None or driver.longitude is None:
            continue

        distance = calculate_distance(
            ride.pickup_latitude,
            ride.pickup_longitude,
            driver.latitude,
            driver.longitude
        )

        if distance < shortest_distance:
            shortest_distance = distance
            nearest_driver = driver

    if nearest_driver is None:
        return {
            "message": "No drivers with valid locations found"
        }

    ride.driver_id = nearest_driver.id
    ride.status = "accepted"

    nearest_driver.is_available = "offline"

    db.commit()

    return {
        "message": "Nearest driver assigned",
        "driver_id": nearest_driver.id,
        "distance_km": round(shortest_distance, 2)
    }

@router.post("/start/{ride_id}")
def start_ride(
    ride_id: int,
    db: Session = Depends(get_db)
):

    ride = db.query(Ride).filter(
        Ride.id == ride_id
    ).first()

    if not ride:
        return {
            "message": "Ride not found"
        }

    ride.status = "started"

    db.commit()

    return {
        "message": "Ride started",
        "ride_id": ride.id
    }

@router.post("/complete/{ride_id}")
def complete_ride(
    ride_id: int,
    db: Session = Depends(get_db)
):

    ride = db.query(Ride).filter(
        Ride.id == ride_id
    ).first()

    if not ride:
        return {
            "message": "Ride not found"
        }

    ride.status = "completed"

    driver = db.query(Driver).filter(
        Driver.id == ride.driver_id
    ).first()

    if driver:
        driver.is_available = "online"

    db.commit()

    return {
        "message": "Ride completed",
        "ride_id": ride.id
    }
