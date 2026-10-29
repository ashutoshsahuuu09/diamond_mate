import motor.motor_asyncio
from app.config import settings

client: motor.motor_asyncio.AsyncIOMotorClient = None
db = None


async def connect_db():
    global client, db
    client = motor.motor_asyncio.AsyncIOMotorClient(settings.MONGODB_URL)
    db = client[settings.DATABASE_NAME]
    print(f"[+] Connected to MongoDB: {settings.DATABASE_NAME}")


async def close_db():
    global client
    if client:
        client.close()
        print("[-] MongoDB connection closed")


def get_db():
    return db
