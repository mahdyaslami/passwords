<template>
  <div class="max-w-xl mx-auto pt-20">
    <div>
      <a
        href="#"
        class="text-blue-500 underline float-right ml-2"
        @click="remove"
      >Remove</a>
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
  pair.tags = item.tags.map((tag) => tag.trim())
  database.replace(route.params.id, pair)

  router.push('/')
}

function remove() {
  if (confirm('Are you sure you want to remove this item?')) {
    database.remove(route.params.id)
    router.push('/')
  }
}
</script>
