from pydantic import BaseModel, EmailStr, Field
from typing import Optional, List
from datetime import date, datetime
from enum import Enum

class BranchEnum(str, Enum):
    CSE = "CSE"
    ECE = "ECE"
    IT = "IT"
    ME = "ME"
    CE = "CE"

# Student Schemas
class StudentBase(BaseModel):
    name: str = Field(..., min_length=2, max_length=100)
    email: EmailStr
    branch: BranchEnum
    enrollment_date: date

class StudentCreate(StudentBase):
    pass

class StudentUpdate(BaseModel):
    name: Optional[str] = Field(None, min_length=2, max_length=100)
    email: Optional[EmailStr] = None
    branch: Optional[BranchEnum] = None
    enrollment_date: Optional[date] = None

class StudentResponse(StudentBase):
    id: int
    created_at: Optional[datetime] = None

    class Config:
        from_attributes = True

# Course Schemas
class CourseBase(BaseModel):
    title: str = Field(..., min_length=2, max_length=200)
    code: str = Field(..., min_length=2, max_length=20)
    credits: int = Field(3, ge=1, le=6)

class CourseCreate(CourseBase):
    department_id: Optional[int] = None

class CourseResponse(CourseBase):
    id: int
    department_id: Optional[int] = None

    class Config:
        from_attributes = True

# Pagination wrapper
class PaginatedResponse(BaseModel):
    total: int
    page: int
    limit: int
    pages: int
    data: List[StudentResponse]

class MessageResponse(BaseModel):
    message: str
