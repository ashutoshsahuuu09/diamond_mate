from fastapi import APIRouter, HTTPException
from app.database import get_db

router = APIRouter(prefix="/api/certificates", tags=["Certificates"])


@router.get("/{certificate_id}")
async def get_certificate(certificate_id: str):
    db = get_db()
    cert = await db.certificates.find_one({"certificate_id": certificate_id})
    if not cert:
        raise HTTPException(status_code=404, detail="Certificate not found")
    cert["id"] = str(cert.pop("_id"))
    return cert
