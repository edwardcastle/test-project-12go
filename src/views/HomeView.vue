<script setup lang="ts">
//Vue
import { onMounted, ref } from 'vue'
// components
import PhoneInput from '@/components/PhoneInput.vue'

const browserLocale = ref<string>('')
const placeholder = ref<string>('Phone Number')

onMounted(() => {
  browserLocale.value = navigator.language || navigator.userLanguage
  if (browserLocale.value === 'en-US') {
    placeholder.value = '+1 (123) 456-7890'
  }
})
</script>

<template>
  <main class="container">
    <div class="box">
      <PhoneInput :placeholder="placeholder" />
    </div>
  </main>
</template>

<style scoped>
.container {
  .box {
    display: flex;
    min-height: 100vh;
    justify-content: center;
    align-items: center;
  }
}
</style>
