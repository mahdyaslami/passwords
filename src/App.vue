<template>
  <div class="max-w-xl mx-auto pt-20">
    <div class="mb-4">
      <base-label
        for="search"
      >
        Search
      </base-label>
      <div class="mt-1">
        <base-input
          id="search"
          type="text"
          placeholder="blograph.ir valasr"
        />
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
import BaseInput from '@/components/Input'
import BaseLabel from '@/components/Label'
import PairCard from './components/PairCard'

const database = useDatabaseStore()

</script>
