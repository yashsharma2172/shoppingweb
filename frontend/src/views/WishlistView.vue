<template>
  <div class="wishlist">
    <h1>My Wishlist</h1>

    <div v-if="wishlistItems.length === 0" class="empty-wishlist">
      <p>Your wishlist is empty</p>
      <router-link to="/" class="continue-btn">Continue Shopping</router-link>
    </div>

    <div v-else class="wishlist-container">
      <div v-for="item in wishlistItems" :key="item.id" class="wishlist-item">
        <img :src="item.image_url" :alt="item.title" class="item-image">
        
        <div class="item-info">
          <h3>{{ item.title }}</h3>
          <p class="category">{{ item.category }}</p>
          <p class="price">₹{{ item.price }}</p>
        </div>

        <div class="item-actions">
          <button @click="moveToCart(item)" class="cart-btn">Move to Cart</button>
          <button @click="removeFromWishlist(item.id)" class="remove-btn">Remove</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useWishlist } from '../composables/useWishlist'
import { useCart } from '../composables/useCart'

const { wishlistItems, removeFromWishlist } = useWishlist()
const { addToCart } = useCart()

const moveToCart = (item: any) => {
  addToCart(item)
  removeFromWishlist(item.id)
}
</script>

<style scoped>
.wishlist {
  max-width: 1200px;
  margin: 0 auto;
}

.wishlist h1 {
  color: #0f172a;
  margin-bottom: 2rem;
}

.empty-wishlist {
  text-align: center;
  padding: 3rem;
  background: white;
  border-radius: 12px;
  color: #64748b;
}

.empty-wishlist p {
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

.wishlist-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
}

.wishlist-item {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(15, 23, 42, 0.1);
  transition: transform 0.2s ease;
  display: flex;
  flex-direction: column;
}

.wishlist-item:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 12px rgba(15, 23, 42, 0.15);
}

.item-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.item-info {
  padding: 1rem;
  flex: 1;
}

.item-info h3 {
  margin: 0 0 0.5rem 0;
  color: #0f172a;
  font-size: 1rem;
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

.item-actions {
  display: flex;
  gap: 0.5rem;
  width: 100%;
}

.cart-btn {
  flex: 1;
  background: #10b981;
  color: white;
  border: none;
  padding: 0.75rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s ease;
}

.cart-btn:hover {
  background: #059669;
}

.remove-btn {
  flex: 1;
  background: #ef4444;
  color: white;
  border: none;
  padding: 0.75rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s ease;
}

.remove-btn:hover {
  background: #dc2626;
}
</style>
