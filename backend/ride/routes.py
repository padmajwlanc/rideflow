from fastapi import APIRouter
from fastapi import Depends

from sqlalchemy.orm import Session

from ride.models import Ride
from ride.schemas import RideCreate

from auth.dependencies import get_current_user
from auth.models import User

from database.db import get_db
from driver.models import Driver

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
        pickup_location=ride.pickup_location,
        drop_location=ride.drop_location
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

    driver = db.query(Driver).filter(
        Driver.is_available == "online"
    ).first()

    if not driver:
        return {
            "message": "No drivers available"
        }

    ride.driver_id = driver.id
    ride.status = "accepted"

    driver.is_available = "offline"

    db.commit()

    return {
        "message": "Driver assigned",
        "driver_id": driver.id,
        "ride_id": ride.id
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
