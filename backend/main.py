from fastapi import FastAPI

from auth.models import Base
from database.db import engine

from auth.routes import router

Base.metadata.create_all(bind=engine)

app = FastAPI(title="RideFlow")

app.include_router(router)

@app.get("/")
def home():
    return {
        "message": "RideFlow Backend Running"
    }