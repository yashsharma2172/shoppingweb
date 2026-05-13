<template>
  <div class="auth-page">
    <SignIn fallback-redirect-url="/" />
  </div>
</template>

<script setup lang="ts">
import { SignIn } from '@clerk/vue';
</script>

<style scoped>
.auth-page {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - 120px);
  padding: 2rem;
  background: #f8fafc;
}
</style>
