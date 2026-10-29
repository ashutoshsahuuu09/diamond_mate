from pydantic import BaseModel
from typing import Optional
from datetime import datetime


class CertificateModel(BaseModel):
    certificate_id: str
    lab: str
    report_number: str
    ring_id: Optional[str] = None
    carat: float
    cut: str
    color: str
    clarity: str
    polish: str
    symmetry: str
    fluorescence: str
    measurements: str
    issue_date: str
    verified: bool = True
    qr_url: Optional[str] = None
    created_at: datetime = None
