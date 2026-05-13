<template>
  <div class="product-card">
    <div class="image-container">
      <img :src="product.image_url" :alt="product.title" class="product-image">
      <button @click="toggleWishlist" :class="{ favorited: isWishlisted }" class="wishlist-btn">
        ♡
      </button>
    </div>
    
    <div class="product-info">
      <h3>{{ product.title }}</h3>
      <p class="price">₹{{ product.price }}</p>
      <button @click="addToCart" class="add-to-cart-btn">Add to Cart</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useCart } from '../composables/useCart'
import { useWishlist } from '../composables/useWishlist'

const props = defineProps({
  product: {
    type: Object,
    required: true
  }
})

const { addToCart: addToCartAction } = useCart()
const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist()
const isWishlisted = ref(false)

onMounted(() => {
  isWishlisted.value = isInWishlist(props.product.id)
})

const addToCart = () => {
  addToCartAction(props.product)
}

const toggleWishlist = () => {
  if (isWishlisted.value) {
    removeFromWishlist(props.product.id)
  } else {
    addToWishlist(props.product)
  }
  isWishlisted.value = !isWishlisted.value
}
</script>

<style scoped>
.product-card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(15, 23, 42, 0.1);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.product-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 12px rgba(15, 23, 42, 0.15);
}

.image-container {
  position: relative;
  overflow: hidden;
  background: #f1f5f9;
  aspect-ratio: 1;
}

.product-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.wishlist-btn {
  position: absolute;
  top: 8px;
  right: 8px;
  background: white;
  border: 2px solid #e2e8f0;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  cursor: pointer;
  font-size: 1.2rem;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.wishlist-btn:hover {
  border-color: #ef4444;
  color: #ef4444;
}

.wishlist-btn.favorited {
  background: #ef4444;
  border-color: #ef4444;
  color: white;
}

.product-info {
  padding: 1rem;
}

.product-info h3 {
  margin: 0 0 0.5rem 0;
  color: #0f172a;
  font-size: 0.95rem;
  line-height: 1.4;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.price {
  color: #4338ca;
  font-weight: 700;
  margin: 0 0 1rem 0;
  font-size: 1.1rem;
}

.add-to-cart-btn {
  width: 100%;
  background: #4338ca;
  color: white;
  border: none;
  padding: 0.75rem;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
  transition: background 0.2s ease;
}

.add-to-cart-btn:hover {
  background: #3730a3;
}
</style>
