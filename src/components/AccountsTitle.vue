<template>
  <div class="title-wrapper">
    <h1 class="title-wrapper__title">
      Учетные записи
    </h1>

    <Button
      class="title-wrapper__add-button"
      @onClick="$emit('addAccount')"
    >
      <PlusSvg />
    </Button>
  </div>
</template>

<script setup lang="ts">
import Button from '@/components/Base/Button.vue'
import PlusSvg from '@/components/Base/SvgComponents/PlusSvg.vue'

defineEmits<{
  (e: 'addAccount'): void
}>()
</script>

<style lang="scss" scoped>
.title-wrapper {
  display: flex;
  align-items: center;
  gap: 15px;
}
</style>