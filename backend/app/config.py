from pydantic_settings import BaseSettings
from typing import List


class Settings(BaseSettings):
    MONGODB_URL: str = "mongodb://localhost:27017"
    DATABASE_NAME: str = "diamondmate"
    ALLOWED_ORIGINS: str = "http://localhost:5173,http://localhost:5174,http://localhost:5175,http://localhost:3000"

    @property
    def origins_list(self) -> List[str]:
        return [o.strip() for o in self.ALLOWED_ORIGINS.split(",")]

    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"


settings = Settings()
