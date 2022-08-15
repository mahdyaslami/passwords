<template>
  <div>
    <pair-form />

    <div
      v-for="row in database.rows"
      :key="row.id"
    >
      <template v-if="row.type === 'pair'">
        <span>{{ row.key }}</span><span> : </span>

        <span>{{ row.value }}</span>
      </template>
    </div>
  </div>
</template>

<script setup>
import PairForm from '@/components/PairForm'
import { useDatabaseStore } from '@/stores/database'

const database = useDatabaseStore()

</script>
