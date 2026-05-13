<template>
  <div class="cart">
    <h1>Shopping Cart</h1>

    <div v-if="cartItems.length === 0" class="empty-cart">
      <p>Your cart is empty</p>
      <router-link to="/" class="continue-btn">Continue Shopping</router-link>
    </div>

    <div v-else class="cart-container">
      <div class="cart-items">
        <div v-for="item in cartItems" :key="item.id" class="cart-item">
          <img :src="item.image_url" :alt="item.title" class="item-image">
          
          <div class="item-details">
            <h3>{{ item.title }}</h3>
            <p class="category">{{ item.category }}</p>
            <p class="price">₹{{ item.price }}</p>
          </div>

          <div class="quantity-controls">
            <button @click="decreaseQuantity(item.id)" class="qty-btn">−</button>
            <input v-model.number="item.quantity" type="number" class="qty-input" @change="updateQty(item.id, item.quantity)">
            <button @click="increaseQuantity(item.id)" class="qty-btn">+</button>
          </div>

          <div class="item-total">
            ₹{{ (item.price * item.quantity).toFixed(2) }}
          </div>

          <button @click="handleRemove(item.id)" class="remove-btn">Remove</button>
        </div>
      </div>

      <div class="order-summary">
        <h2>Order Summary</h2>
        <div class="summary-row">
          <span>Subtotal</span>
          <span>₹{{ subtotal.toFixed(2) }}</span>
        </div>
        <div class="summary-row">
          <span>Delivery Fee</span>
          <span>₹{{ deliveryFee.toFixed(2) }}</span>
        </div>
        <div class="summary-row total">
          <span>Total</span>
          <span>₹{{ total.toFixed(2) }}</span>
        </div>
        <button class="checkout-btn">Proceed to Checkout</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCart } from '../composables/useCart'

const { cartItems, removeItem, updateQuantity, subtotal, deliveryFee, total } = useCart()

const increaseQuantity = (id: number) => {
  const item = cartItems.value.find(i => i.id === id)
  if (item) {
    updateQuantity(id, item.quantity + 1)
  }
}

const decreaseQuantity = (id: number) => {
  const item = cartItems.value.find(i => i.id === id)
  if (item && item.quantity > 1) {
    updateQuantity(id, item.quantity - 1)
  }
}

const updateQty = (id: number, quantity: number) => {
  if (quantity > 0) {
    updateQuantity(id, quantity)
  }
}

const handleRemove = (id: number) => {
  removeItem(id)
}
</script>

<style scoped>
.cart {
  max-width: 1200px;
  margin: 0 auto;
}

.cart h1 {
  color: #0f172a;
  margin-bottom: 2rem;
}

.empty-cart {
  text-align: center;
  padding: 3rem;
  background: white;
  border-radius: 12px;
  color: #64748b;
}

.empty-cart p {
  font-size: 1.1rem;
  margin-bottom: 1rem;
}

.continue-btn {
  display: inline-block;
  background: #4338ca;
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 6px;
  text-decoration: none;
  font-weight: 600;
  transition: background 0.2s ease;
}

.continue-btn:hover {
  background: #3730a3;
}

.cart-container {
  display: grid;
  grid-template-columns: 1fr 350px;
  gap: 2rem;
}

.cart-items {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.cart-item {
  background: white;
  padding: 1.5rem;
  border-radius: 12px;
  display: flex;
  gap: 1rem;
  align-items: center;
  box-shadow: 0 1px 3px rgba(15, 23, 42, 0.1);
}

.item-image {
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 8px;
}

.item-details {
  flex: 1;
}

.item-details h3 {
  margin: 0 0 0.5rem 0;
  color: #0f172a;
}

.category {
  font-size: 0.85rem;
  color: #64748b;
  margin: 0 0 0.5rem 0;
}

.price {
  color: #4338ca;
  font-weight: 700;
  margin: 0;
}

.quantity-controls {
  display: flex;
  gap: 0.5rem;
  align-items: center;
}

.qty-btn {
  background: #a78bfa;
  color: white;
  border: none;
  width: 32px;
  height: 32px;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 600;
  transition: background 0.2s ease;
}

.qty-btn:hover {
  background: #9f7aea;
}

.qty-input {
  width: 50px;
  padding: 0.5rem;
  border: 1px solid #e2e8f0;
  border-radius: 4px;
  text-align: center;
}

.item-total {
  min-width: 100px;
  text-align: right;
  font-weight: 600;
  color: #0f172a;
}

.remove-btn {
  background: #ef4444;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
  transition: background 0.2s ease;
}

.remove-btn:hover {
  background: #dc2626;
}

.order-summary {
  background: white;
  padding: 1.5rem;
  border-radius: 12px;
  height: fit-content;
  box-shadow: 0 1px 3px rgba(15, 23, 42, 0.1);
}

.order-summary h2 {
  margin: 0 0 1.5rem 0;
  color: #0f172a;
  font-size: 1.1rem;
}

.summary-row {
  display: flex;
  justify-content: space-between;
  padding: 0.75rem 0;
  border-bottom: 1px solid #e2e8f0;
  color: #475569;
}

.summary-row.total {
  border: none;
  padding-top: 1rem;
  font-weight: 700;
  font-size: 1.1rem;
  color: #0f172a;
}

.checkout-btn {
  width: 100%;
  background: #10b981;
  color: white;
  border: none;
  padding: 1rem;
  border-radius: 6px;
  margin-top: 1.5rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s ease;
}

.checkout-btn:hover {
  background: #059669;
}

@media (max-width: 768px) {
  .cart-container {
    grid-template-columns: 1fr;
  }

  .cart-item {
    flex-wrap: wrap;
  }

  .item-details {
    flex: 0 0 100%;
  }
}
</style>
