<template>
  <div class="max-w-xl mx-auto pt-20">
    <div class="flex justify-between">
      <h1 class="text-3xl mb-8">
        Create Pair
      </h1>

      <router-link
        to="/"
        class="text-blue-500 underline"
      >
        Search
      </router-link>
    </div>

    <pair-form @save="save" />
  </div>
</template>

<script setup>
import { useDatabaseStore } from '@/stores/database'
import { useRouter } from 'vue-router'
import PairForm from './Form'

const router = useRouter()
const database = useDatabaseStore()

function save(item) {
  database.createPair(item.key, item.value)
  router.push('/')
}
</script>
