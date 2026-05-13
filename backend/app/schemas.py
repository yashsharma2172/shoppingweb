from pydantic import BaseModel
from typing import List, Optional


class Product(BaseModel):
    id: int
    title: str
    category: str
    description: str
    price: float
    image_url: str
    rating: Optional[float] = None


class CartItem(BaseModel):
    product_id: int
    quantity: int


class CheckoutSummary(BaseModel):
    subtotal: float
    delivery_fee: float
    total: float
    item_count: int
