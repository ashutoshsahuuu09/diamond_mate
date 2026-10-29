from bson import ObjectId
from datetime import datetime
from app.database import get_db
from app.schemas.ring_schema import RingCreateSchema, RingUpdateSchema


def serialize_ring(ring: dict) -> dict:
    ring["id"] = str(ring.pop("_id"))
    return ring


async def get_all_rings(
    collection: str = None,
    metal: str = None,
    min_price: float = None,
    max_price: float = None,
    min_carat: float = None,
    sort_by: str = "created_at",
    limit: int = 50,
    skip: int = 0,
):
    db = get_db()
    query = {}
    if collection:
        query["collection"] = {"$regex": collection, "$options": "i"}
    if metal:
        query["metal_options"] = {"$in": [metal]}
    if min_price is not None:
        query.setdefault("base_price", {})["$gte"] = min_price
    if max_price is not None:
        query.setdefault("base_price", {})["$lte"] = max_price
    if min_carat is not None:
        query["diamond.carat"] = {"$gte": min_carat}

    sort_field = "base_price" if sort_by == "price_asc" else (
        "-base_price" if sort_by == "price_desc" else "created_at"
    )
    direction = -1 if sort_by == "price_desc" else 1

    cursor = db.rings.find(query).sort(sort_field, direction).skip(skip).limit(limit)
    rings = []
    async for ring in cursor:
        rings.append(serialize_ring(ring))
    return rings


async def get_ring_by_id(ring_id: str) -> dict:
    if not ObjectId.is_valid(ring_id):
        return None
    db = get_db()
    try:
        ring = await db.rings.find_one({"_id": ObjectId(ring_id)})
        if ring:
            return serialize_ring(ring)
    except Exception:
        pass
    return None


async def create_ring(ring_data: RingCreateSchema) -> dict:
    db = get_db()
    data = ring_data.model_dump()
    data["created_at"] = datetime.utcnow()
    data["reviews"] = []
    result = await db.rings.insert_one(data)
    ring = await db.rings.find_one({"_id": result.inserted_id})
    return serialize_ring(ring)


async def update_ring(ring_id: str, update_data: RingUpdateSchema) -> dict:
    if not ObjectId.is_valid(ring_id):
        return None
    db = get_db()
    update = {k: v for k, v in update_data.model_dump().items() if v is not None}
    await db.rings.update_one({"_id": ObjectId(ring_id)}, {"$set": update})
    return await get_ring_by_id(ring_id)


async def get_collections() -> list:
    db = get_db()
    result = await db.rings.distinct("collection")
    return result


async def get_featured_rings() -> list:
    db = get_db()
    cursor = db.rings.find({"is_featured": True}).limit(8)
    rings = []
    async for ring in cursor:
        rings.append(serialize_ring(ring))
    return rings
