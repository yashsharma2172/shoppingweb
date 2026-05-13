<script setup lang="ts">
import { useUser } from '@clerk/vue'

const { user, isLoaded, isSignedIn } = useUser()

const handleLogout = () => {
  // Navigate to a logout endpoint - Clerk will handle clearing the session
  // Or use Clerk's managed sign-out flow
  if (window.Clerk) {
    window.Clerk.session?.end().then(() => {
      window.location.href = '/'
    }).catch(() => {
      window.location.href = '/'
    })
  } else {
    // Fallback: just reload
    window.location.href = '/'
  }
}
</script>

<template>
  <div class="app-shell">
    <header class="topbar">
      <div class="brand">
        <router-link to="/">FreshCart</router-link>
      </div>
      <nav class="nav-links">
        <router-link to="/">Home</router-link>
        <router-link to="/cart">Cart</router-link>
        <router-link to="/wishlist">Wishlist</router-link>
        <template v-if="isLoaded && !isSignedIn">
          <router-link to="/login" class="auth-link">Login</router-link>
          <router-link to="/signup" class="auth-link">Sign Up</router-link>
        </template>
        <template v-else-if="isLoaded && isSignedIn && user">
          <span class="user-info">{{ user.firstName || user.emailAddresses[0]?.emailAddress }}</span>
          <button class="auth-link logout-btn" @click="handleLogout">Logout</button>
        </template>
      </nav>
    </header>

    <main class="main-content">
      <router-view />
    </main>

    <footer class="footer"></footer>
  </div>
</template>

<style scoped>
.app-shell {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: #f8fafc;
}

.topbar {
  background: white;
  border-bottom: 1px solid #e2e8f0;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 1px 3px rgba(15, 23, 42, 0.1);
}

.brand a {
  font-size: 1.5rem;
  font-weight: 700;
  color: #4338ca;
  text-decoration: none;
}

.nav-links {
  display: flex;
  gap: 2rem;
  align-items: center;
}

.nav-links a {
  color: #475569;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s ease;
}

.nav-links a:hover {
  color: #4338ca;
}

.nav-links .auth-link {
  background: #4338ca;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 6px;
}

.nav-links .auth-link:hover {
  background: #3730a3;
  color: white;
}

.user-info {
  color: #475569;
  font-weight: 500;
}

.logout-btn {
  border: none;
  cursor: pointer;
  font-size: 1rem;
}

.main-content {
  flex: 1;
  padding: 2rem;
}

.footer {
  background: white;
  border-top: 1px solid #e2e8f0;
  padding: 2rem;
  text-align: center;
  color: #64748b;
  margin-top: auto;
}
</style>
