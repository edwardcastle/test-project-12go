<script setup lang="ts">
// Vue
import { computed, ref } from 'vue'

defineProps<{
  placeholder: string
}>()

const emit = defineEmits(['update:modelValue'])

const number = ref<string | number>()

const maskedValue = computed({
  get() {
    return number.value
  },
  set(value) {
    const updateValues = cleanInput(value)
    emit('update:modelValue', updateValues)
  }
})

const cleanInput = (value) => value?.replace(/[^\d\s()+-]/g, '')

const onInput = (event) => (maskedValue.value = event.target.value)

const onkeypress = (event) => {
  const allowedInput = /[\d\s()+-]/
  const character = String.fromCharCode(event.keyCode || event.which)
  if (!allowedInput.test(character)) {
    event.preventDefault()
  }
}
</script>

<template>
  <section>
    <input
      class="phone"
      v-model="number"
      id="phone-input"
      type="tel"
      :placeholder="placeholder"
      @input="onInput"
      @keypress="onkeypress"
    />
  </section>
</template>

<style>
section {
  input {
    background-color: #f2f2f2;
    height: 2.5rem;
    border-radius: 33px;
    padding: 0 20px;
    box-shadow: none;
    width: 300px;

    :focus {
      outline: none;
    }
  }
}
</style>
