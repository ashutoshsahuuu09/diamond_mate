from fastapi import APIRouter, HTTPException, Query
from typing import Optional
from app.services import ring_service
from app.schemas.ring_schema import RingCreateSchema, RingUpdateSchema, RingResponseSchema

router = APIRouter(prefix="/api/rings", tags=["Rings"])


@router.get("", response_model=list)
async def list_rings(
    collection: Optional[str] = None,
    metal: Optional[str] = None,
    min_price: Optional[float] = None,
    max_price: Optional[float] = None,
    min_carat: Optional[float] = None,
    sort_by: Optional[str] = Query("created_at", enum=["created_at", "price_asc", "price_desc", "rating"]),
    limit: int = Query(50, le=100),
    skip: int = 0,
):
    return await ring_service.get_all_rings(
        collection=collection,
        metal=metal,
        min_price=min_price,
        max_price=max_price,
        min_carat=min_carat,
        sort_by=sort_by,
        limit=limit,
        skip=skip,
    )


@router.get("/featured")
async def get_featured():
    return await ring_service.get_featured_rings()


@router.get("/collections")
async def get_collections():
    return await ring_service.get_collections()


@router.get("/{ring_id}")
async def get_ring(ring_id: str):
    ring = await ring_service.get_ring_by_id(ring_id)
    if not ring:
        raise HTTPException(status_code=404, detail="Ring not found")
    return ring


@router.post("", status_code=201)
async def create_ring(ring_data: RingCreateSchema):
    return await ring_service.create_ring(ring_data)


@router.put("/{ring_id}")
async def update_ring(ring_id: str, update_data: RingUpdateSchema):
    updated = await ring_service.update_ring(ring_id, update_data)
    if not updated:
        raise HTTPException(status_code=404, detail="Ring not found")
    return updated
