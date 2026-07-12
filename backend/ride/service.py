from sqlalchemy.orm import Session

from ride.models import Ride

from driver.models import Driver
from utils.distance import calculate_distance
from ride.constants import RideStatus

from utils.fare import calculate_fare

def create_ride(
    ride_data,
    current_user,
    db: Session
):

    new_ride = Ride(
        rider_id=current_user.id,
        pickup_latitude=ride_data.pickup_latitude,
        pickup_longitude=ride_data.pickup_longitude,
        drop_latitude=ride_data.drop_latitude,
        drop_longitude=ride_data.drop_longitude
    )

    db.add(new_ride)

    db.commit()

    db.refresh(new_ride)

    return new_ride

def assign_nearest_driver(
    ride_id: int,
    db: Session
):

    ride = db.query(Ride).filter(
        Ride.id == ride_id
    ).first()

    if not ride:
        return None, "Ride not found"

    online_drivers = db.query(Driver).filter(
        Driver.is_available == "online"
    ).all()

    if not online_drivers:
        return None, "No drivers available"

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
        return None, "No drivers with valid locations found"

    ride.driver_id = nearest_driver.id
    ride.status = RideStatus.ACCEPTED
    
    ride.fare = calculate_fare(shortest_distance)

    nearest_driver.is_available = "offline"

    db.commit()

    return (
        {
            "driver_id": nearest_driver.id,
            "distance_km": round(shortest_distance, 2),
            "ride_id": ride.id
        },
        None
    )
def get_ride_history(
    rider_id: int,
    db: Session
):

    rides = db.query(Ride).filter(
        Ride.rider_id == rider_id
    ).all()

    return rides

def start_ride(
    ride_id: int,
    db: Session
):

    ride = db.query(Ride).filter(
        Ride.id == ride_id
    ).first()

    if not ride:
        return None, "Ride not found"

    ride.status = RideStatus.STARTED

    db.commit()

    return ride, None

def complete_ride(
    ride_id: int,
    db: Session
):

    ride = db.query(Ride).filter(
        Ride.id == ride_id
    ).first()

    if not ride:
        return None, "Ride not found"

    ride.status = RideStatus.COMPLETED

    driver = db.query(Driver).filter(
        Driver.id == ride.driver_id
    ).first()

    if driver:
        driver.is_available = "online"

    db.commit()

    return ride, None