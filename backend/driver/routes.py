from fastapi import APIRouter
from fastapi import Depends

from sqlalchemy.orm import Session

from driver.models import Driver
from driver.schemas import DriverCreate

from auth.dependencies import get_current_user
from auth.models import User

from database.db import get_db
from driver.schemas import DriverStatus

router = APIRouter(
    prefix="/driver",
    tags=["Driver"]
)

@router.post("/register")
def register_driver(
    driver: DriverCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):

    existing_driver = db.query(Driver).filter(
        Driver.user_id == current_user.id
    ).first()

    if existing_driver:

        return {
            "message": "Driver already exists"
        }

    new_driver = Driver(
        user_id=current_user.id,
        license_number=driver.license_number,
        vehicle_type=driver.vehicle_type,
        vehicle_number=driver.vehicle_number
    )

    db.add(new_driver)

    db.commit()

    db.refresh(new_driver)

    return {
        "message": "Driver registered successfully",
        "driver_id": new_driver.id
    }

@router.patch("/availability")
def update_availability(
    status: DriverStatus,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):

    driver = db.query(Driver).filter(
        Driver.user_id == current_user.id
    ).first()

    if not driver:
        return {
            "message": "Driver not found"
        }

    driver.is_available = status

    db.commit()

    return {
        "message": f"Driver is now {status}"
    }

@router.get("/profile")
def driver_profile(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):

    driver = db.query(Driver).filter(
        Driver.user_id == current_user.id
    ).first()

    if not driver:
        return {
            "message": "Driver not found"
        }

    return {
        "driver_id": driver.id,
        "license_number": driver.license_number,
        "vehicle_type": driver.vehicle_type,
        "vehicle_number": driver.vehicle_number,
        "rating": driver.rating,
        "status": driver.is_available
    }
@router.patch("/location")
def update_location(
    latitude: float,
    longitude: float,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):

    driver = db.query(Driver).filter(
        Driver.user_id == current_user.id
    ).first()

    if not driver:
        return {
            "message": "Driver not found"
        }

    driver.latitude = latitude
    driver.longitude = longitude

    db.commit()

    return {
        "message": "Location updated"
    }