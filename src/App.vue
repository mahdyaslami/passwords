<template>
  <div class="max-w-xl mx-auto pt-20">
    <div class="mb-4">
      <label
        for="search"
        class="block text-sm font-medium text-gray-700"
      >Search</label>
      <div class="mt-1">
        <input
          id="search"
          type="text"
          class="focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm
            border-gray-300 rounded-md"
          placeholder="blograph.ir valasr"
        >
      </div>
    </div>

    <div
      v-for="row in database.rows"
      :key="row.id"
    >
      <template v-if="row.type === 'pair'">
        <pair-card :item="row" />
      </template>
    </div>
  </div>
</template>

<script setup>
import { useDatabaseStore } from '@/stores/database'
import PairCard from './components/PairCard'

const database = useDatabaseStore()

</script>
