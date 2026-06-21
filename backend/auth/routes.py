from fastapi import APIRouter
from fastapi import Depends

from sqlalchemy.orm import Session

from auth.schemas import UserCreate
from auth.models import User
from auth.schemas import UserLogin
from auth.utils import verify_password

from auth.utils import hash_password
from auth.jwt_handler import create_access_token
from database.db import get_db

from auth.dependencies import get_current_user

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

@router.post("/login")
def login_user(
    user: UserLogin,
    db: Session = Depends(get_db)
):  
    db_user = db.query(User).filter(User.email == user.email).first()
    
    if not db_user:
        return {
            "message": "User not found"
        }
    if not verify_password(user.password, db_user.password):
        return {
            "message": "Invalid password"
        }
    
    access_token = create_access_token(
        {
            "sub": db_user.email
        }
    )
    return {
        "access_token": access_token,
        "token_type": "bearer"
    }

@router.get("/profile")
def get_profile(
    current_user: User = Depends(get_current_user)
):
    return {
        "id": current_user.id,
        "name": current_user.name,
        "email": current_user.email,
        "role": current_user.role
    }