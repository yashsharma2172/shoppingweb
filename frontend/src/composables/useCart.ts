import { ref, computed } from 'vue'

export interface CartItem {
  id: number
  title: string
  price: number
  quantity: number
  image_url: string
  category: string
}

const state = ref<{ items: CartItem[] }>({
  items: (() => {
    const saved = localStorage.getItem('freshcart-cart')
    return saved ? JSON.parse(saved) : []
  })()
})

const saveCart = () => {
  localStorage.setItem('freshcart-cart', JSON.stringify(state.value.items))
}

const cartItems = computed(() => state.value.items)

const addToCart = (product: any) => {
  const existingItem = state.value.items.find(item => item.id === product.id)
  
  if (existingItem) {
    existingItem.quantity += 1
  } else {
    state.value.items.push({
      id: product.id,
      title: product.title,
      price: product.price,
      quantity: 1,
      image_url: product.image_url,
      category: product.category
    })
  }
  saveCart()
}

const removeItem = (id: number) => {
  const index = state.value.items.findIndex(item => item.id === id)
  if (index > -1) {
    state.value.items.splice(index, 1)
  }
  saveCart()
}

const updateQuantity = (id: number, quantity: number) => {
  const item = state.value.items.find(item => item.id === id)
  if (item && quantity > 0) {
    item.quantity = quantity
    saveCart()
  }
}

const subtotal = computed(() => {
  return state.value.items.reduce((sum, item) => sum + (item.price * item.quantity), 0)
})

const deliveryFee = computed(() => subtotal.value > 0 ? 99 : 0)
const total = computed(() => subtotal.value + deliveryFee.value)

export const useCart = () => {
  return {
    cartItems,
    addToCart,
    removeItem,
    updateQuantity,
    subtotal,
    deliveryFee,
    total
  }
}
