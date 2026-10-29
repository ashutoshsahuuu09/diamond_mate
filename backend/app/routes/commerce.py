from fastapi import APIRouter, HTTPException
from app.services import order_service
from app.schemas.order_schema import (
    CartAddSchema, OrderCreateSchema, CustomizationCreateSchema
)

router = APIRouter(tags=["Commerce"])


# ── Cart ──────────────────────────────────────────────────────────────────────

@router.get("/api/cart/{user_id}")
async def get_cart(user_id: str):
    return await order_service.get_cart(user_id)


@router.post("/api/cart", status_code=201)
async def add_to_cart(data: CartAddSchema):
    return await order_service.add_to_cart(data)


@router.delete("/api/cart/{user_id}/{item_ring_id}")
async def remove_from_cart(user_id: str, item_ring_id: str):
    return await order_service.remove_from_cart(user_id, item_ring_id)


# ── Orders ────────────────────────────────────────────────────────────────────

@router.post("/api/orders", status_code=201)
async def create_order(data: OrderCreateSchema):
    return await order_service.create_order(data)


@router.get("/api/orders/{order_id}")
async def get_order(order_id: str):
    order = await order_service.get_order(order_id)
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")
    return order


# ── Customizations ────────────────────────────────────────────────────────────

@router.post("/api/customizations", status_code=201)
async def create_customization(data: CustomizationCreateSchema):
    return await order_service.create_customization(data)


@router.get("/api/customizations/{cust_id}")
async def get_customization(cust_id: str):
    doc = await order_service.get_customization(cust_id)
    if not doc:
        raise HTTPException(status_code=404, detail="Customization not found")
    return doc
