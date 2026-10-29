from pydantic import BaseModel, Field
from typing import Optional, List
from datetime import datetime


class DiamondInfo(BaseModel):
    carat: float
    cut: str
    color: str
    clarity: str
    polish: str
    symmetry: str
    certificate_id: Optional[str] = None


class ReviewModel(BaseModel):
    user_name: str
    rating: float
    comment: str
    date: datetime = Field(default_factory=datetime.utcnow)


class RingModel(BaseModel):
    name: str
    collection: str
    description: str
    base_price: float
    metal: str
    metal_options: List[str]
    diamond: DiamondInfo
    images: List[str]
    rating: float = 4.5
    review_count: int = 0
    reviews: List[ReviewModel] = []
    in_stock: bool = True
    is_featured: bool = False
    tags: List[str] = []
    created_at: datetime = Field(default_factory=datetime.utcnow)
