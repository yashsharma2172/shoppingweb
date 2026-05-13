from fastapi import APIRouter
from ..schemas import CartItem, CheckoutSummary
from ..data import products

router = APIRouter(prefix="/cart", tags=["cart"])


@router.post("/summary", response_model=CheckoutSummary)
async def get_cart_summary(items: list[CartItem]):
    subtotal = 0.0
    item_count = 0

    product_map = {product["id"]: product for product in products}
    for item in items:
        product = product_map.get(item.product_id)
        if not product or item.quantity < 1:
            continue
        subtotal += product["price"] * item.quantity
        item_count += item.quantity

    delivery_fee = 0.0 if subtotal >= 100 else 10.0 if subtotal > 0 else 0.0
    total = subtotal + delivery_fee

    return CheckoutSummary(
        subtotal=round(subtotal, 2),
        delivery_fee=round(delivery_fee, 2),
        total=round(total, 2),
        item_count=item_count,
    )
