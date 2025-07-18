import uuid
from fastapi import APIRouter, Depends, HTTPException, BackgroundTasks, Cookie, Response
from sqlalchemy.orm import Session

from db.database import get_db, SessionLocal
from models.job import ReadmeJob
from schemas.job import ReadmeCreate, ReadmeJobStatus
from schemas.readme import ReadmeJobOut
from core.readme_generator import ReadmeGenerator

router = APIRouter(
    prefix="/jobs",
    tags=["Jobs"]
)

# Create a new README generation job using Gemini
@router.post("/create", response_model=ReadmeJobStatus)
def create_readme(
    request: ReadmeCreate,
    background_tasks: BackgroundTasks,
    db: Session = Depends(get_db)
):
    job_id = str(uuid.uuid4())
    job = ReadmeJob(
        job_id=job_id,
        status="pending",
        prompt=None,
        error=None,
        completed_at=None
    )

    db.add(job)
    db.commit()
    db.refresh(job)

    # ✅ Correctly pass all required fields
    background_tasks.add_task(
        ReadmeGenerator.generate,
        db,
        job_id,
        request.project_name,
        request.tech_stack,
        request.languages,
        request.description
    )

    return ReadmeJobStatus(
        job_id=job.job_id,
        status=job.status,
        prompt=job.prompt,
        error=job.error,
        completed_at=job.completed_at
    )

# Get the status of a job
@router.get("/{job_id}", response_model=ReadmeJobOut)
def get_job_status(job_id: str, db: Session = Depends(get_db)):
    job = db.query(ReadmeJob).filter(ReadmeJob.job_id == job_id).first()
    if not job:
        raise HTTPException(status_code=404, detail="Job not found")
    return job
