<template>
  <input
    :value="modelValue"
    class="focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm
            border-gray-300 rounded-md"
    @input="$emit('update:modelValue', $event.target.value)"
  >
</template>

<script setup>
defineProps(['modelValue'])
defineEmits(['update:modelValue'])
</script>
