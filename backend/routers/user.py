from typing import Annotated
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from db.database import get_db
from schemas.user import UserResponse
from models.user import User
from core.security import get_current_user

router = APIRouter(
    tags=["Users"]
)

@router.get("/me/", response_model=UserResponse)
async def read_users_me(
    current_user: Annotated[User, Depends(get_current_user)]
):
    """
    Get information about the current authenticated user.
    This route is protected and requires a valid JWT token.
    """
    return current_user

@router.get("/{user_id}", response_model=UserResponse)
async def read_user(
        user_id: int,
        current_user: Annotated[User, Depends(get_current_user)],
        db: Session = Depends(get_db)
):
    """
    Get information about a specific user by ID.
    This route is protected and requires a valid JWT token.
    """
    if current_user.id != user_id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not authorized to view this user's profile"
        )

    user = db.query(User).filter(User.id == user_id).first()
    if user is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")
    return user