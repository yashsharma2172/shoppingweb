<template>
  <div class="auth-page">
    <SignUp fallback-redirect-url="/" />
  </div>
</template>

<script setup lang="ts">
import { SignUp } from '@clerk/vue';
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
