from fastapi import FastAPI
from fastapi import WebSocket
from websocket.manager import manager

from auth.models import Base
from database.db import engine

from auth.routes import router

from driver.models import Driver

from driver.routes import router as driver_router

from ride.models import Ride
from ride.routes import router as ride_router

Base.metadata.create_all(bind=engine)

app = FastAPI(title="RideFlow")

app.include_router(router)

@app.get("/")
def home():
    return {
        "message": "RideFlow Backend Running"
    }

app.include_router(driver_router)
app.include_router(ride_router)

@app.websocket("/ws/location")
async def websocket_location(
    websocket: WebSocket
):

    await manager.connect(websocket)

    try:

        while True:

            await websocket.receive_text()

    except Exception:

        manager.disconnect(websocket)