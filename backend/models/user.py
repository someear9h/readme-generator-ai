from sqlalchemy import Column, Integer, String, Boolean
from sqlalchemy.orm import relationship

from db.database import Base

class User(Base):
    """
    SQLAlchemy model for the 'users' table.
    Represents a user in the database.
    """
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True, nullable=False)
    email = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    is_active = Column(Boolean, default=True)

    # Relationship to Readme model
    # Make sure Readme model also has 'owner_id' and 'owner = relationship("User", back_populates="readmes")'
    # readmes = relationship("Readme", back_populates="owner")

    def __repr__(self):
        """
        String representation for debugging purposes.
        """
        return f"<User(id={self.id}, username='{self.username}', email='{self.email}')>"
