import { ref, computed } from 'vue'

export interface WishlistProduct {
  id: number
  title: string
  price: number
  category: string
  image_url: string
}

const state = ref<{ items: WishlistProduct[] }>({
  items: (() => {
    const saved = localStorage.getItem('freshcart-wishlist')
    return saved ? JSON.parse(saved) : []
  })()
})

const saveWishlist = () => {
  localStorage.setItem('freshcart-wishlist', JSON.stringify(state.value.items))
}

const wishlistItems = computed(() => state.value.items)

const addToWishlist = (product: any) => {
  if (!state.value.items.find(item => item.id === product.id)) {
    state.value.items.push({
      id: product.id,
      title: product.title,
      price: product.price,
      category: product.category,
      image_url: product.image_url
    })
    saveWishlist()
  }
}

const removeFromWishlist = (id: number) => {
  const index = state.value.items.findIndex(item => item.id === id)
  if (index > -1) {
    state.value.items.splice(index, 1)
  }
  saveWishlist()
}

const isInWishlist = (id: number) => {
  return state.value.items.some(item => item.id === id)
}

export const useWishlist = () => {
  return {
    wishlistItems,
    addToWishlist,
    removeFromWishlist,
    isInWishlist
  }
}
