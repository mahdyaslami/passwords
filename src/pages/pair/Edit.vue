<template>
  <div class="max-w-xl mx-auto pt-20">
    <div>
      <router-link
        to="/"
        class="text-blue-500 underline float-right"
      >
        Search
      </router-link>

      <h1 class="text-3xl mb-8">
        Edit Pair
      </h1>
    </div>

    <pair-form
      :item="pair"
      @save="save"
    />
  </div>
</template>

<script setup>
import { useDatabaseStore } from '@/stores/database'
import { useRouter, useRoute } from 'vue-router'
import PairForm from './Form'

const route = useRoute()
const router = useRouter()
const database = useDatabaseStore()

const pair = database.find(route.params.id) ?? router.push('/')

function save(item) {
  pair.key = item.key
  pair.value = item.value
  database.replace(route.params.id, pair)

  router.push('/')
}
</script>
