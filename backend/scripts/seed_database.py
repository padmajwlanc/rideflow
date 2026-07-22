import random
import sys
import os
from datetime import datetime, timedelta

from faker import Faker

sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from database.db import SessionLocal

from auth.models import User
from driver.models import Driver
from ride.models import Ride

from passlib.context import CryptContext


fake = Faker("en_IN")

pwd_context = CryptContext(
    schemes=["bcrypt"],
    deprecated="auto"
)


db = SessionLocal()


def hash_password(password: str):
    return pwd_context.hash(password)

def clear_database():
    print("Deleting existing data...")

    db.query(Ride).delete()
    db.query(Driver).delete()
    db.query(User).delete()

    db.commit()

    print("Database cleared.\n")

def create_users():

    print("Creating users...")

    riders = []
    drivers = []

    # Riders
    for _ in range(50):

        user = User(
            name=fake.name(),
            email=fake.unique.email(),
            password=hash_password("password123"),
            role="rider"
        )

        db.add(user)
        riders.append(user)

    # Driver Accounts
    for _ in range(25):

        user = User(
            name=fake.name(),
            email=fake.unique.email(),
            password=hash_password("password123"),
            role="driver"
        )

        db.add(user)
        drivers.append(user)

    db.commit()

    print("Users created.\n")

    return riders, drivers

def create_drivers(driver_users):

    print("Creating drivers...")

    vehicle_types = [
        "Sedan",
        "SUV",
        "Bike",
        "Auto"
    ]

    drivers = []

    for user in driver_users:

        driver = Driver(
            user_id=user.id,
            license_number=f"LIC{random.randint(100000,999999)}",
            vehicle_type=random.choice(vehicle_types),
            vehicle_number=f"MH{random.randint(10,99)}"
                           f"{chr(random.randint(65,90))}"
                           f"{chr(random.randint(65,90))}"
                           f"{random.randint(1000,9999)}",
            rating=round(random.uniform(4.1,5.0),1),
            is_available=random.choice([
                "online",
                "offline"
            ]),
            latitude=19.0760 + random.uniform(-0.05,0.05),
            longitude=72.8777 + random.uniform(-0.05,0.05)
        )

        db.add(driver)
        drivers.append(driver)

    db.commit()

    print("Drivers created.\n")

    return drivers

def create_rides(riders, drivers):

    print("Creating rides...")

    ride_status = [
        "completed",
        "completed",
        "completed",
        "completed",
        "completed",
        "completed",
        "completed",
        "completed",
        "cancelled",
        "requested"
    ]

    for _ in range(500):

        rider = random.choice(riders)
        driver = random.choice(drivers)

        pickup_lat = 19.0760 + random.uniform(-0.05, 0.05)
        pickup_lon = 72.8777 + random.uniform(-0.05, 0.05)

        drop_lat = 19.0760 + random.uniform(-0.05, 0.05)
        drop_lon = 72.8777 + random.uniform(-0.05, 0.05)

        created_time = fake.date_time_between(
            start_date="-30d",
            end_date="now"
        )

        status = random.choice(ride_status)

        started = None
        completed = None

        if status == "completed":

            started = created_time + timedelta(
                minutes=random.randint(2, 10)
            )

            completed = started + timedelta(
                minutes=random.randint(10, 40)
            )

        fare = round(
            random.uniform(80, 500),
            2
        )

        ride = Ride(
            rider_id=rider.id,
            driver_id=driver.id,
            pickup_latitude=pickup_lat,
            pickup_longitude=pickup_lon,
            drop_latitude=drop_lat,
            drop_longitude=drop_lon,
            fare=fare,
            status=status,
            created_at=created_time,
            started_at=started,
            completed_at=completed
        )

        db.add(ride)

    db.commit()

    print("500 rides created.\n")

if __name__ == "__main__":

    clear_database()

    riders, driver_users = create_users()

    drivers = create_drivers(driver_users)

    create_rides(
        riders,
        drivers
    )

    print("===================================")
    print("Database seeded successfully!")
    print("===================================")

    db.close()