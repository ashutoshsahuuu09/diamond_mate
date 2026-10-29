from pydantic import BaseModel, Field
from typing import Optional, List
from datetime import datetime


# ── Diamond ──────────────────────────────────────────────────────────────────

class DiamondInfoSchema(BaseModel):
    carat: float
    cut: str
    color: str
    clarity: str
    polish: str
    symmetry: str
    certificate_id: Optional[str] = None


# ── Review ────────────────────────────────────────────────────────────────────

class ReviewSchema(BaseModel):
    user_name: str
    rating: float = Field(..., ge=1, le=5)
    comment: str
    date: Optional[datetime] = None


# ── Ring ──────────────────────────────────────────────────────────────────────

class RingCreateSchema(BaseModel):
    name: str
    collection: str
    description: str
    base_price: float = Field(..., gt=0)
    metal: str
    metal_options: List[str]
    diamond: DiamondInfoSchema
    images: List[str] = []
    rating: float = 4.5
    review_count: int = 0
    is_featured: bool = False
    tags: List[str] = []


class RingUpdateSchema(BaseModel):
    name: Optional[str] = None
    base_price: Optional[float] = None
    in_stock: Optional[bool] = None
    is_featured: Optional[bool] = None


class RingResponseSchema(BaseModel):
    id: str
    name: str
    collection: str
    description: str
    base_price: float
    metal: str
    metal_options: List[str]
    diamond: DiamondInfoSchema
    images: List[str]
    rating: float
    review_count: int
    reviews: List[ReviewSchema] = []
    in_stock: bool
    is_featured: bool
    tags: List[str]
    created_at: Optional[datetime] = None
