from fastapi import APIRouter, Query
from ..schemas import Product
from ..data import categories, products

router = APIRouter(prefix="/products", tags=["products"])


@router.get("/", response_model=list[Product])
async def get_products(category: str | None = Query(None)):
    if category:
        return [product for product in products if product["category"] == category]
    return products


@router.get("/categories", response_model=list[str])
async def get_categories():
    return categories
