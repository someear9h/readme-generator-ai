from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from db.database import get_db
from models.job import ReadmeJob
from schemas.readme import ReadmeJobOut
router = APIRouter(
    prefix="/jobs",
    tags=["Jobs"]
)

@router.get("/{job_id}", response_model=ReadmeJobOut)
def get_job_status(job_id: str, db: Session = Depends(get_db)):
    job = db.query(ReadmeJob).filter(ReadmeJob.job_id == job_id).first()

    if not job:
        raise HTTPException(status_code=404, detail="Job not found")

    return job
