from sqlalchemy import Column, Integer, String, DateTime, Text
from sqlalchemy.sql import func
from db.database import Base

class Readme(Base):
    __tablename__ = "readmes"

    id = Column(Integer, primary_key=True, index=True)
    session_id = Column(String, nullable=False)

    project_name = Column(String, nullable=False)
    tech_stack = Column(String)
    languages = Column(String)
    description = Column(Text)
    generated_content = Column(Text)

    created_at = Column(DateTime(timezone=True), server_default=func.now())
