import uuid
from typing import Optional
from datetime import datetime
from fastapi import APIRouter, Depends, HTTPException, BackgroundTasks, Cookie, Response
from sqlalchemy.orm import Session

from db.database import get_db, SessionLocal
from models.job import ReadmeJob
from schemas.job import ReadmeCreate, ReadmeJobStatus

router = APIRouter(
    prefix="/jobs",
    tags=["Jobs"]
)

# 🍪 Get or create session cookie
def get_session_id(session_id: Optional[str] = Cookie(None)):
    if not session_id:
        session_id = str(uuid.uuid4())
    return session_id


# ✅ Create a new README generation job
@router.post("/create", response_model=ReadmeJobStatus)
def create_readme(
    request: ReadmeCreate,
    background_tasks: BackgroundTasks,
    response: Response,
    session_id: str = Depends(get_session_id),
    db: Session = Depends(get_db)
):
    response.set_cookie(key="session_id", value=session_id, httponly=True)

    job_id = str(uuid.uuid4())
    job = ReadmeJob(
        job_id=job_id,
        prompt=request.description,
        status="pending"
    )
    db.add(job)
    db.commit()
    db.refresh(job)

    background_tasks.add_task(generate_readme_task, job_id, request)

    return job


# ✅ Background task to generate README (mocked here)
def generate_readme_task(job_id: str, request_data: ReadmeCreate):
    db = SessionLocal()
    try:
        job = db.query(ReadmeJob).filter(ReadmeJob.job_id == job_id).first()
        if not job:
            return

        job.status = "processing"
        db.commit()

        # TODO: Replace this block with your actual Gemini/GPT generation logic
        generated_readme = f"""# {request_data.project_name}

**Tech Stack**: {request_data.tech_stack}

**Languages**: {request_data.languages}

**Description**: {request_data.description}
"""
        # Log or save content somewhere if needed
        job.status = "completed"
        job.prompt = generated_readme
        job.completed_at = datetime.now()
        db.commit()

    except Exception as e:
        job.status = "failed"
        job.error = str(e)
        job.completed_at = datetime.now()
        db.commit()
    finally:
        db.close()