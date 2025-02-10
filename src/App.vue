<template>
  <div class="app">
    <AccountsInfo />
  </div>
</template>

<script setup lang="ts">
import AccountsInfo from '@/components/AccountsInfo.vue';

</script>

<style lang="scss">
* {
  box-sizing: border-box;
}

.app {
  font-family: Helvetica, Arial, sans-serif;
  max-width: 1200px;
  margin: 0 auto;

  h1 {
    font-size: 24px;
  }
}
</style>
