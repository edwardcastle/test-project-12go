<script setup lang="ts">
defineProps<{
  placeholder: string
}>()
</script>

<template>
  <section>
    <input type="text" :placeholder="placeholder" />
  </section>
</template>

<style scoped></style>
