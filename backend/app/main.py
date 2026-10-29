from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager

from app.database import connect_db, close_db
from app.config import settings
from app.routes import rings, commerce, certificates


@asynccontextmanager
async def lifespan(app: FastAPI):
    await connect_db()
    yield
    await close_db()


app = FastAPI(
    title="DiamondMate API",
    description="Premium diamond boutique REST API — DiamondMate",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc",
    lifespan=lifespan,
)

app.add_middleware(
    CORSMiddleware,
    allow_origin_regex=r"^https?://(localhost|127\.0\.0\.1)(:\d+)?$",
    allow_origins=settings.origins_list,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(rings.router)
app.include_router(commerce.router)
app.include_router(certificates.router)


@app.get("/health", tags=["Health"])
async def health_check():
    return {"status": "ok", "service": "DiamondMate API", "version": "1.0.0"}


if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app.main:app", host="127.0.0.1", port=8000, reload=True)

