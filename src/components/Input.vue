<template>
  <input
    v-model="value"
    class="focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm
            border-gray-300 rounded-md"
  >
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps(['modelValue'])

const emit = defineEmits(['update:modelValue'])

const value = computed({
  get() {
    return props.modelValue
  },
  set(val) {
    emit('update:modelValue', val)
  },
})
</script>
