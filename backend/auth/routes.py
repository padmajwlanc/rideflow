from fastapi import APIRouter
from fastapi import Depends

from sqlalchemy.orm import Session

from auth.schemas import UserCreate
from auth.models import User

from auth.utils import hash_password

from database.db import get_db

router = APIRouter()

@router.post("/register")
def register_user(
    user: UserCreate,
    db: Session = Depends(get_db)
):

    hashed_password = hash_password(
        user.password
    )

    new_user = User(
        name=user.name,
        email=user.email,
        password=hashed_password
    )

    db.add(new_user)

    db.commit()

    db.refresh(new_user)

    return {
        "message": "User registered successfully",
        "user_id": new_user.id
    }

print("Authentication routes defined successfully!")