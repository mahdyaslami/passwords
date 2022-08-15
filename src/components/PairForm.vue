<template>
  <form @submit.prevent="database.createPair(state.key, state.value)">
    <label for="key">Key</label>
    <input
      id="key"
      v-model="state.key"
      class="border"
      type="text"
    >

    <label for="value">Value</label>
    <input
      id="value"
      v-model="state.value"
      class="border"
      type="text"
    >

    <button class="bg-blue-200">
      Create pair
    </button>
  </form>
</template>

<script setup>
import { reactive } from 'vue'
import { useDatabaseStore } from '@/stores/database'

const database = useDatabaseStore()

const state = reactive({
  key: '',
  value: '',
})

</script>
