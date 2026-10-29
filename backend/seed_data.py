"""
DiamondMate — Seed Data Script
Populates MongoDB with demo rings, collections, and certificates.
Run: python seed_data.py
"""
import asyncio
import motor.motor_asyncio
from datetime import datetime, timedelta
import random
import os
from dotenv import load_dotenv

import sys
if sys.platform == "win32":
    import io
    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8", errors="replace")
    sys.stderr = io.TextIOWrapper(sys.stderr.buffer, encoding="utf-8", errors="replace")

load_dotenv()

MONGO_URL = os.getenv("MONGODB_URL", "mongodb://localhost:27017")
DB_NAME = os.getenv("DATABASE_NAME", "diamondmate")

client = motor.motor_asyncio.AsyncIOMotorClient(MONGO_URL)
db = client[DB_NAME]

RINGS = [
    {
        "name": "Celestial Solitaire",
        "collection": "Solitaire",
        "description": "A timeless round brilliant diamond set in a classic four-prong solitaire mounting. Effortlessly elegant, eternally romantic.",
        "base_price": 85000,
        "metal": "18K Gold",
        "metal_options": ["18K Gold", "White Gold", "Platinum"],
        "diamond": {"carat": 1.0, "cut": "Excellent", "color": "G", "clarity": "VS1", "polish": "Excellent", "symmetry": "Excellent", "certificate_id": "CERT-DM-001"},
        "images": [
            "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800",
            "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800",
        ],
        "rating": 4.9,
        "review_count": 124,
        "is_featured": True,
        "tags": ["bestseller", "classic", "solitaire"],
        "reviews": [
            {"user_name": "Priya M.", "rating": 5, "comment": "Absolutely stunning. My fiancé was speechless!", "date": datetime.utcnow() - timedelta(days=10)},
            {"user_name": "Rohan K.", "rating": 5, "comment": "Quality is exceptional. Worth every rupee.", "date": datetime.utcnow() - timedelta(days=5)},
        ],
        "in_stock": True,
        "created_at": datetime.utcnow(),
    },
    {
        "name": "Aurora Halo",
        "collection": "Halo",
        "description": "A dazzling round brilliant diamond encircled by a halo of brilliant pavé diamonds, creating an aura of light and luxury.",
        "base_price": 125000,
        "metal": "Platinum",
        "metal_options": ["Platinum", "18K Gold", "White Gold"],
        "diamond": {"carat": 1.2, "cut": "Excellent", "color": "F", "clarity": "VVS2", "polish": "Excellent", "symmetry": "Excellent", "certificate_id": "CERT-DM-002"},
        "images": [
            "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800",
            "https://images.unsplash.com/photo-1603561596112-0a132b757442?w=800",
        ],
        "rating": 4.8,
        "review_count": 89,
        "is_featured": True,
        "tags": ["halo", "luxury", "platinum"],
        "reviews": [
            {"user_name": "Ananya S.", "rating": 5, "comment": "The halo makes it look so much bigger and brighter!", "date": datetime.utcnow() - timedelta(days=15)},
        ],
        "in_stock": True,
        "created_at": datetime.utcnow(),
    },
    {
        "name": "Maharani Vintage",
        "collection": "Vintage",
        "description": "Inspired by the opulence of royal Indian heritage. Intricate milgrain detailing meets a cushion-cut diamond for timeless grandeur.",
        "base_price": 115000,
        "metal": "Rose Gold",
        "metal_options": ["Rose Gold", "18K Gold", "White Gold"],
        "diamond": {"carat": 1.0, "cut": "Very Good", "color": "H", "clarity": "VS2", "polish": "Very Good", "symmetry": "Very Good", "certificate_id": "CERT-DM-003"},
        "images": [
            "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800",
            "https://images.unsplash.com/photo-1602751584552-8ba74a314ddf?w=800",
        ],
        "rating": 4.7,
        "review_count": 67,
        "is_featured": True,
        "tags": ["vintage", "rose-gold", "heritage"],
        "reviews": [
            {"user_name": "Kavitha R.", "rating": 5, "comment": "Absolutely majestic. The vintage detailing is perfect.", "date": datetime.utcnow() - timedelta(days=20)},
        ],
        "in_stock": True,
        "created_at": datetime.utcnow(),
    },
    {
        "name": "Eternity Band",
        "collection": "Eternity",
        "description": "A continuous circle of brilliant diamonds, symbolising unending love. Perfect as a standalone piece or stacked beautifully.",
        "base_price": 145000,
        "metal": "Platinum",
        "metal_options": ["Platinum", "18K Gold", "White Gold"],
        "diamond": {"carat": 1.5, "cut": "Excellent", "color": "E", "clarity": "VVS1", "polish": "Excellent", "symmetry": "Excellent", "certificate_id": "CERT-DM-004"},
        "images": [
            "https://images.unsplash.com/photo-1561828995-aa79a2db86dd?w=800",
            "https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?w=800",
        ],
        "rating": 4.9,
        "review_count": 102,
        "is_featured": True,
        "tags": ["eternity", "band", "anniversary"],
        "reviews": [
            {"user_name": "Meera J.", "rating": 5, "comment": "A beautiful anniversary gift. She loved it!", "date": datetime.utcnow() - timedelta(days=3)},
        ],
        "in_stock": True,
        "created_at": datetime.utcnow(),
    },
    {
        "name": "Nova Solitaire",
        "collection": "Solitaire",
        "description": "A sleek modern solitaire with a six-prong basket setting that elevates the diamond for maximum brilliance.",
        "base_price": 72000,
        "metal": "White Gold",
        "metal_options": ["White Gold", "18K Gold", "Platinum"],
        "diamond": {"carat": 0.8, "cut": "Excellent", "color": "G", "clarity": "SI1", "polish": "Very Good", "symmetry": "Excellent", "certificate_id": "CERT-DM-005"},
        "images": [
            "https://images.unsplash.com/photo-1631556821168-3e1ffe882a04?w=800",
            "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800",
        ],
        "rating": 4.6,
        "review_count": 45,
        "is_featured": False,
        "tags": ["modern", "solitaire", "white-gold"],
        "reviews": [],
        "in_stock": True,
        "created_at": datetime.utcnow(),
    },
    {
        "name": "Rose Halo",
        "collection": "Halo",
        "description": "A romantic rose-gold halo setting that frames a brilliant oval diamond. Feminine, modern, and breathtaking.",
        "base_price": 135000,
        "metal": "Rose Gold",
        "metal_options": ["Rose Gold", "18K Gold"],
        "diamond": {"carat": 1.2, "cut": "Excellent", "color": "F", "clarity": "VS1", "polish": "Excellent", "symmetry": "Excellent", "certificate_id": "CERT-DM-006"},
        "images": [
            "https://images.unsplash.com/photo-1603561596112-0a132b757442?w=800",
            "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800",
        ],
        "rating": 4.8,
        "review_count": 78,
        "is_featured": True,
        "tags": ["halo", "rose-gold", "oval"],
        "reviews": [
            {"user_name": "Divya P.", "rating": 5, "comment": "The oval shape is stunning in rose gold!", "date": datetime.utcnow() - timedelta(days=7)},
        ],
        "in_stock": True,
        "created_at": datetime.utcnow(),
    },
    {
        "name": "Lumière Vintage",
        "collection": "Vintage",
        "description": "Art deco inspired filigree work surrounds a princess-cut diamond. A masterpiece of artisan craftsmanship.",
        "base_price": 98000,
        "metal": "18K Gold",
        "metal_options": ["18K Gold", "Rose Gold"],
        "diamond": {"carat": 0.8, "cut": "Very Good", "color": "H", "clarity": "VS2", "polish": "Very Good", "symmetry": "Very Good", "certificate_id": "CERT-DM-007"},
        "images": [
            "https://images.unsplash.com/photo-1602751584552-8ba74a314ddf?w=800",
            "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800",
        ],
        "rating": 4.7,
        "review_count": 52,
        "is_featured": False,
        "tags": ["vintage", "art-deco", "princess-cut"],
        "reviews": [],
        "in_stock": True,
        "created_at": datetime.utcnow(),
    },
    {
        "name": "Infinity Half-Eternity",
        "collection": "Eternity",
        "description": "A refined half-eternity band with a single row of channel-set diamonds across the finger. Modern elegance.",
        "base_price": 88000,
        "metal": "Platinum",
        "metal_options": ["Platinum", "White Gold"],
        "diamond": {"carat": 1.0, "cut": "Excellent", "color": "G", "clarity": "VS1", "polish": "Excellent", "symmetry": "Excellent", "certificate_id": "CERT-DM-008"},
        "images": [
            "https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?w=800",
            "https://images.unsplash.com/photo-1561828995-aa79a2db86dd?w=800",
        ],
        "rating": 4.6,
        "review_count": 33,
        "is_featured": False,
        "tags": ["eternity", "half-band", "channel-set"],
        "reviews": [],
        "in_stock": True,
        "created_at": datetime.utcnow(),
    },
    {
        "name": "Cascade Halo",
        "collection": "Halo",
        "description": "A double halo of micro-pavé diamonds cascades around a pear-shaped centre stone. Dramatic and unforgettable.",
        "base_price": 185000,
        "metal": "Platinum",
        "metal_options": ["Platinum", "White Gold", "18K Gold"],
        "diamond": {"carat": 1.5, "cut": "Excellent", "color": "E", "clarity": "VVS1", "polish": "Excellent", "symmetry": "Excellent", "certificate_id": "CERT-DM-009"},
        "images": [
            "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800",
            "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800",
        ],
        "rating": 5.0,
        "review_count": 61,
        "is_featured": False,
        "tags": ["halo", "double-halo", "pear-shape", "luxury"],
        "reviews": [
            {"user_name": "Nisha A.", "rating": 5, "comment": "The most stunning ring I have ever seen!", "date": datetime.utcnow() - timedelta(days=2)},
        ],
        "in_stock": True,
        "created_at": datetime.utcnow(),
    },
    {
        "name": "Starlight Solitaire",
        "collection": "Solitaire",
        "description": "A delicate knife-edge band elevates a round brilliant in a bezel setting. Minimalist luxury at its finest.",
        "base_price": 95000,
        "metal": "Platinum",
        "metal_options": ["Platinum", "White Gold"],
        "diamond": {"carat": 1.0, "cut": "Excellent", "color": "F", "clarity": "VVS2", "polish": "Excellent", "symmetry": "Excellent", "certificate_id": "CERT-DM-010"},
        "images": [
            "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800",
            "https://images.unsplash.com/photo-1631556821168-3e1ffe882a04?w=800",
        ],
        "rating": 4.8,
        "review_count": 88,
        "is_featured": False,
        "tags": ["minimalist", "bezel", "platinum"],
        "reviews": [],
        "in_stock": True,
        "created_at": datetime.utcnow(),
    },
    {
        "name": "Golden Embrace",
        "collection": "Vintage",
        "description": "An ornate wrap-style setting in warm 18K gold, featuring a marquise-cut diamond that elongates the finger beautifully.",
        "base_price": 108000,
        "metal": "18K Gold",
        "metal_options": ["18K Gold"],
        "diamond": {"carat": 1.2, "cut": "Very Good", "color": "G", "clarity": "VS1", "polish": "Very Good", "symmetry": "Very Good", "certificate_id": "CERT-DM-011"},
        "images": [
            "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800",
            "https://images.unsplash.com/photo-1602751584552-8ba74a314ddf?w=800",
        ],
        "rating": 4.5,
        "review_count": 29,
        "is_featured": False,
        "tags": ["vintage", "marquise", "gold"],
        "reviews": [],
        "in_stock": True,
        "created_at": datetime.utcnow(),
    },
    {
        "name": "Sovereign Eternity",
        "collection": "Eternity",
        "description": "A full-eternity band featuring two rows of brilliant-cut diamonds set in a shared-prong setting. The ultimate declaration of love.",
        "base_price": 220000,
        "metal": "Platinum",
        "metal_options": ["Platinum", "18K Gold"],
        "diamond": {"carat": 2.0, "cut": "Excellent", "color": "D", "clarity": "FL", "polish": "Excellent", "symmetry": "Excellent", "certificate_id": "CERT-DM-012"},
        "images": [
            "https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?w=800",
            "https://images.unsplash.com/photo-1561828995-aa79a2db86dd?w=800",
        ],
        "rating": 5.0,
        "review_count": 17,
        "is_featured": True,
        "tags": ["eternity", "full-band", "flawless", "premium"],
        "reviews": [
            {"user_name": "Vikram S.", "rating": 5, "comment": "Flawless diamond, flawless service. Worth every penny.", "date": datetime.utcnow() - timedelta(days=1)},
        ],
        "in_stock": True,
        "created_at": datetime.utcnow(),
    },
]

CERTIFICATES = [
    {
        "certificate_id": "CERT-DM-001",
        "lab": "DiamondMate Gemological Lab (Demo)",
        "report_number": "DML-2024-001-A",
        "carat": 1.0,
        "cut": "Excellent",
        "color": "G",
        "clarity": "VS1",
        "polish": "Excellent",
        "symmetry": "Excellent",
        "fluorescence": "None",
        "measurements": "6.40 × 6.43 × 3.96 mm",
        "issue_date": "2024-03-15",
        "verified": True,
    },
    {
        "certificate_id": "CERT-DM-002",
        "lab": "DiamondMate Gemological Lab (Demo)",
        "report_number": "DML-2024-002-B",
        "carat": 1.2,
        "cut": "Excellent",
        "color": "F",
        "clarity": "VVS2",
        "polish": "Excellent",
        "symmetry": "Excellent",
        "fluorescence": "None",
        "measurements": "6.95 × 6.98 × 4.25 mm",
        "issue_date": "2024-04-22",
        "verified": True,
    },
    {
        "certificate_id": "CERT-DM-012",
        "lab": "DiamondMate Gemological Lab (Demo)",
        "report_number": "DML-2024-012-S",
        "carat": 2.0,
        "cut": "Excellent",
        "color": "D",
        "clarity": "FL",
        "polish": "Excellent",
        "symmetry": "Excellent",
        "fluorescence": "None",
        "measurements": "8.15 × 8.18 × 4.95 mm",
        "issue_date": "2024-06-01",
        "verified": True,
    },
]


async def seed():
    print("[*] Seeding DiamondMate database...")

    await db.rings.drop()
    await db.certificates.drop()
    await db.carts.drop()

    result = await db.rings.insert_many(RINGS)
    print(f"[+] Inserted {len(result.inserted_ids)} rings")

    await db.certificates.insert_many(CERTIFICATES)
    print(f"[+] Inserted {len(CERTIFICATES)} certificates")

    # Create indexes
    await db.rings.create_index("collection")
    await db.rings.create_index("base_price")
    await db.rings.create_index("is_featured")
    print("[+] Indexes created")

    print("[DONE] Seed complete!")


if __name__ == "__main__":
    asyncio.run(seed())
