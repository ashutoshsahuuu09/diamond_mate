from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime


class CartItemModel(BaseModel):
    ring_id: str
    ring_name: str
    image: str
    metal: str
    carat: float
    setting: str
    ring_size: float
    quantity: int = 1
    unit_price: float
    customization_id: Optional[str] = None


class CartModel(BaseModel):
    user_id: str
    items: List[CartItemModel] = []
    created_at: datetime = None
    updated_at: datetime = None


class OrderAddressModel(BaseModel):
    name: str
    email: str
    phone: str
    address: str
    city: str
    state: str
    pincode: str


class OrderModel(BaseModel):
    order_id: str
    user_id: str
    items: List[CartItemModel]
    address: OrderAddressModel
    payment_method: str
    subtotal: float
    delivery_charge: float
    total: float
    status: str = "confirmed"
    estimated_delivery: str
    created_at: datetime = None


class CustomizationModel(BaseModel):
    ring_id: str
    user_id: Optional[str] = None
    metal: str
    carat: float
    setting: str
    ring_size: float
    base_price: float
    diamond_price: float
    metal_price: float
    setting_price: float
    total_price: float
    created_at: datetime = None
