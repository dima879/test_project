<template>
  <button
    type="button"
    @click="$emit('onClick')"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
defineEmits<{
  (e: 'onClick'): void
}>()
</script>

<style lang="scss" scoped>
button {
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  height: 30px;
  width: 30px;
  background-color: #fff;
  border-radius: 10px;
}
</style>