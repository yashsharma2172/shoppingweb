<template>
  <div class="home">
    <div class="hero-panel">
      <h1>FreshCart</h1>
      <p>Your one-stop shop for fresh groceries and more</p>
    </div>

    <div class="category-menu">
      <button 
        v-for="cat in categories"
        :key="cat"
        @click="scrollToCategory(cat)"
        :class="{ active: activeCategory === cat }"
        class="category-btn"
      >
        {{ cat }}
      </button>
    </div>

    <div v-if="loading" class="loading">Loading products...</div>

    <template v-else>
      <div v-for="category in categories" :key="category" class="category-section" :data-category="category">
        <h2>{{ category }}</h2>
        <div class="products-grid">
          <ProductCard 
            v-for="product in getProductsByCategory(category)"
            :key="product.id"
            :product="product"
          />
        </div>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import ProductCard from '../components/ProductCard.vue'
import { useProducts } from '../composables/useProducts'

const { products, loading, categories, fetchProducts, getProductsByCategory } = useProducts()
const activeCategory = ref<string>('')

onMounted(() => {
  fetchProducts()
})

const scrollToCategory = (category: string) => {
  activeCategory.value = category
  const element = document.querySelector(`[data-category="${category}"]`)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
  }
}
</script>

<style scoped>
.home {
  max-width: 1200px;
  margin: 0 auto;
}

.hero-panel {
  background: linear-gradient(135deg, #4338ca 0%, #6366f1 100%);
  color: white;
  padding: 4rem 2rem;
  border-radius: 12px;
  text-align: center;
  margin-bottom: 2rem;
}

.hero-panel h1 {
  font-size: 2.5rem;
  margin: 0 0 1rem 0;
}

.hero-panel p {
  font-size: 1.1rem;
  margin: 0;
  opacity: 0.95;
}

.category-menu {
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
  justify-content: center;
}

.category-btn {
  padding: 0.75rem 1.5rem;
  background: white;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  color: #475569;
  transition: all 0.2s ease;
}

.category-btn:hover {
  border-color: #4338ca;
  color: #4338ca;
}

.category-btn.active {
  background: #4338ca;
  color: white;
  border-color: #4338ca;
}

.category-section {
  margin-bottom: 3rem;
}

.category-section h2 {
  color: #0f172a;
  margin-bottom: 1.5rem;
  font-size: 1.5rem;
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1.5rem;
}

.loading {
  text-align: center;
  padding: 2rem;
  color: #64748b;
  font-size: 1.1rem;
}
</style>
