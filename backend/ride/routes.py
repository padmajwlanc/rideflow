from fastapi import APIRouter
from fastapi import Depends

from sqlalchemy.orm import Session

from ride.models import Ride
from ride.schemas import RideCreate
from ride.service import create_ride
from ride.service import assign_nearest_driver
from ride.service import get_ride_history
from ride.service import start_ride
from ride.service import complete_ride


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

    new_ride = create_ride(
        ride,
        current_user,
        db
    )

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

    return get_ride_history(
        current_user.id,
        db
    )

@router.post("/assign/{ride_id}")
def assign_driver(
    ride_id: int,
    db: Session = Depends(get_db)
):

    result, error = assign_nearest_driver(
        ride_id,
        db
    )

    if error:
        return {
            "message": error
        }

    return {
        "message": "Nearest driver assigned",
        **result
    }

@router.post("/start/{ride_id}")
def start_ride_route(
    ride_id: int,
    db: Session = Depends(get_db)
):

    ride, error = start_ride(
        ride_id,
        db
    )

    if error:
        return {
            "message": error
        }

    return {
        "message": "Ride started",
        "ride_id": ride.id
    }

@router.post("/complete/{ride_id}")
def complete_ride_route(
    ride_id: int,
    db: Session = Depends(get_db)
):

    ride, error = complete_ride(
        ride_id,
        db
    )

    if error:
        return {
            "message": error
        }

    return {
        "message": "Ride completed",
        "ride_id": ride.id
    }