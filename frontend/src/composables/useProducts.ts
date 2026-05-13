import { ref, computed } from 'vue'

export interface Product {
  id: number
  title: string
  price: number
  category: string
  image_url: string
  stock: number
}

const products = ref<Product[]>([])
const loading = ref(false)

export const useProducts = () => {
  const fetchProducts = async () => {
    loading.value = true
    try {
      const response = await fetch('http://localhost:8000/products/')
      products.value = await response.json()
    } catch (error) {
      console.error('Failed to fetch products:', error)
    } finally {
      loading.value = false
    }
  }

  const categories = computed(() => {
    const cats = new Set(products.value.map(p => p.category))
    return Array.from(cats).sort()
  })

  const getProductsByCategory = (category: string) => {
    return products.value.filter(p => p.category === category)
  }

  return {
    products,
    loading,
    categories,
    fetchProducts,
    getProductsByCategory
  }
}
