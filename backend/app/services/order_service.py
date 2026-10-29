from bson import ObjectId
from datetime import datetime
from app.database import get_db
from app.schemas.order_schema import CartAddSchema, OrderCreateSchema, CustomizationCreateSchema
import uuid
import random


# ── Price config ──────────────────────────────────────────────────────────────

DIAMOND_PRICES = {0.8: 120000, 1.0: 165000, 1.2: 210000, 1.5: 285000, 2.0: 420000}
METAL_PRICES = {"18K Gold": 35000, "Platinum": 55000, "Rose Gold": 32000, "White Gold": 38000}
SETTING_PRICES = {"Solitaire": 0, "Halo": 18000, "Vintage": 22000, "Eternity": 28000}


def get_nearest_carat_price(carat: float) -> float:
    return DIAMOND_PRICES.get(carat) or min(DIAMOND_PRICES.values(), key=lambda x: abs(x - carat * 160000))


# ── Cart ──────────────────────────────────────────────────────────────────────

def serialize_doc(doc: dict) -> dict:
    doc["id"] = str(doc.pop("_id"))
    return doc


async def get_cart(user_id: str) -> dict:
    db = get_db()
    cart = await db.carts.find_one({"user_id": user_id})
    if not cart:
        return {"user_id": user_id, "items": [], "subtotal": 0}
    cart = serialize_doc(cart)
    cart["subtotal"] = sum(i["unit_price"] * i["quantity"] for i in cart.get("items", []))
    return cart


async def add_to_cart(data: CartAddSchema) -> dict:
    db = get_db()
    item = data.item.model_dump()
    now = datetime.utcnow()

    existing = await db.carts.find_one({"user_id": data.user_id})
    if existing:
        await db.carts.update_one(
            {"user_id": data.user_id},
            {"$push": {"items": item}, "$set": {"updated_at": now}}
        )
    else:
        await db.carts.insert_one({
            "user_id": data.user_id,
            "items": [item],
            "created_at": now,
            "updated_at": now
        })
    return await get_cart(data.user_id)


async def remove_from_cart(user_id: str, item_ring_id: str) -> dict:
    db = get_db()
    await db.carts.update_one(
        {"user_id": user_id},
        {"$pull": {"items": {"ring_id": item_ring_id}}}
    )
    return await get_cart(user_id)


# ── Orders ────────────────────────────────────────────────────────────────────

async def create_order(data: OrderCreateSchema) -> dict:
    db = get_db()
    order_id = f"DM-{uuid.uuid4().hex[:8].upper()}"
    subtotal = sum(i.unit_price * i.quantity for i in data.items)
    delivery = 0 if subtotal > 100000 else 500
    total = subtotal + delivery
    days = random.randint(5, 8)

    from datetime import timedelta
    delivery_date = (datetime.utcnow() + timedelta(days=days)).strftime("%d %b %Y")

    order_doc = {
        "order_id": order_id,
        "user_id": data.user_id,
        "items": [i.model_dump() for i in data.items],
        "address": data.address.model_dump(),
        "payment_method": data.payment_method,
        "subtotal": subtotal,
        "delivery_charge": delivery,
        "total": total,
        "status": "confirmed",
        "estimated_delivery": delivery_date,
        "created_at": datetime.utcnow()
    }
    await db.orders.insert_one(order_doc)
    # Clear cart after order
    await db.carts.delete_one({"user_id": data.user_id})
    order_doc["id"] = str(order_doc.pop("_id", order_id))
    return order_doc


async def get_order(order_id: str) -> dict:
    db = get_db()
    order = await db.orders.find_one({"order_id": order_id})
    if order:
        order["id"] = str(order.pop("_id"))
    return order


# ── Customization ─────────────────────────────────────────────────────────────

async def create_customization(data: CustomizationCreateSchema) -> dict:
    db = get_db()
    ring = None
    if ObjectId.is_valid(data.ring_id):
        ring = await db.rings.find_one({"_id": ObjectId(data.ring_id)})
    base_price = ring["base_price"] if ring else 80000

    diamond_price = DIAMOND_PRICES.get(round(data.carat, 1), 165000)
    metal_price = METAL_PRICES.get(data.metal, 35000)
    setting_price = SETTING_PRICES.get(data.setting, 0)
    total = base_price + diamond_price + metal_price + setting_price

    doc = {
        "ring_id": data.ring_id,
        "user_id": data.user_id,
        "metal": data.metal,
        "carat": data.carat,
        "setting": data.setting,
        "ring_size": data.ring_size,
        "base_price": base_price,
        "diamond_price": diamond_price,
        "metal_price": metal_price,
        "setting_price": setting_price,
        "total_price": total,
        "created_at": datetime.utcnow()
    }
    result = await db.customizations.insert_one(doc)
    doc["id"] = str(result.inserted_id)
    doc.pop("_id", None)
    return doc


async def get_customization(cust_id: str) -> dict:
    if not ObjectId.is_valid(cust_id):
        return None
    db = get_db()
    doc = await db.customizations.find_one({"_id": ObjectId(cust_id)})
    if doc:
        doc["id"] = str(doc.pop("_id"))
    return doc
