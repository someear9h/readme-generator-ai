from pydantic import BaseModel, EmailStr, Field
from typing import Optional

class UserBase(BaseModel):
    """
    Base Pydantic model for User, containing common fields.
    """
    username: str = Field(..., min_length=3, max_length=50, description="Unique username for the user.")
    email: EmailStr = Field(..., description="Unique email address for the user.")

class UserCreate(UserBase):
    """
    Pydantic model for creating a new user.
    Includes the plain-text password, which will be hashed before storage.
    """
    password: str = Field(..., min_length=8, description="Password for the user. Must be at least 8 characters long.")

class UserInDB(UserBase):
    """
    Pydantic model for user data as stored in the database.
    Includes the hashed password.
    """
    hashed_password: str
    is_active: bool = True # Default value, can be overridden if needed

    class Config:
        """
        Pydantic configuration for ORM mode.
        Allows direct conversion from SQLAlchemy models to Pydantic models.
        """
        from_attributes = True # For Pydantic v2+

class UserResponse(UserBase):
    """
    Pydantic model for responding with user data.
    Excludes sensitive information like the hashed password.
    """
    id: int
    is_active: bool

    class Config:
        """
        Pydantic configuration for ORM mode.
        Allows direct conversion from SQLAlchemy models to Pydantic models.
        """
        from_attributes = True # For Pydantic v2+

class Token(BaseModel):
    """
    Pydantic model for the JWT token response.
    """
    access_token: str
    token_type: str = "bearer"

class TokenData(BaseModel):
    """
    Pydantic model for the data contained within the JWT token.
    """
    username: Optional[str] = None