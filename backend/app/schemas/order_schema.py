from pydantic import BaseModel, Field, EmailStr
from typing import Optional, List
from datetime import datetime


# ── Cart ──────────────────────────────────────────────────────────────────────

class CartItemSchema(BaseModel):
    ring_id: str
    ring_name: str
    image: str
    metal: str
    carat: float
    setting: str
    ring_size: float
    quantity: int = Field(default=1, ge=1)
    unit_price: float
    customization_id: Optional[str] = None


class CartAddSchema(BaseModel):
    user_id: str
    item: CartItemSchema


class CartResponseSchema(BaseModel):
    user_id: str
    items: List[CartItemSchema]
    subtotal: float
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None


# ── Order ─────────────────────────────────────────────────────────────────────

class AddressSchema(BaseModel):
    name: str
    email: str
    phone: str
    address: str
    city: str
    state: str
    pincode: str


class OrderCreateSchema(BaseModel):
    user_id: str
    items: List[CartItemSchema]
    address: AddressSchema
    payment_method: str = "card"


class OrderResponseSchema(BaseModel):
    order_id: str
    user_id: str
    items: List[CartItemSchema]
    address: AddressSchema
    payment_method: str
    subtotal: float
    delivery_charge: float
    total: float
    status: str
    estimated_delivery: str
    created_at: Optional[datetime] = None


# ── Customization ─────────────────────────────────────────────────────────────

class CustomizationCreateSchema(BaseModel):
    ring_id: str
    user_id: Optional[str] = None
    metal: str
    carat: float
    setting: str
    ring_size: float


class CustomizationResponseSchema(BaseModel):
    id: str
    ring_id: str
    metal: str
    carat: float
    setting: str
    ring_size: float
    base_price: float
    diamond_price: float
    metal_price: float
    setting_price: float
    total_price: float
    created_at: Optional[datetime] = None
