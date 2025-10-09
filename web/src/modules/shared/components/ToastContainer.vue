<template>
  <div class="toast-container">
    <transition-group name="toast" tag="div">
      <div
        v-for="toast in toasts"
        :key="toast.id"
        class="toast-item"
        :class="toast.type"
        @click="removeToast(toast.id)"
      >
        {{ toast.message }}
      </div>
    </transition-group>
  </div>
</template>

<script setup lang="ts">
import { useToast } from "../composable/useToast";

const { toasts, removeToast } = useToast();
</script>

<style scoped>
.toast-container {
  position: fixed;
  bottom: 1rem;
  right: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  z-index: 9999;
  pointer-events: none;
}

.toast-item {
  min-width: 220px;
  pointer-events: auto;
  color: white;
  padding: 10px 16px;
  border-radius: 8px;
  font-weight: 500;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  opacity: 0.95;
  transition:
    transform 0.3s ease,
    opacity 0.3s ease;
}

.toast-item.success {
  background-color: #2e7d32;
}

.toast-item.error {
  background-color: #d32f2f;
}

.toast-item.info {
  background-color: #1976d2;
}

.toast-item.warning {
  background-color: #fbc02d;
  color: #000;
}

.toast-enter-active,
.toast-leave-active {
  transition: all 0.3s ease;
}

.toast-enter-from {
  opacity: 0;
  transform: translateY(-10px);
}

.toast-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
