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
import { usePairStore } from '@/stores/database'
import { useRouter, useRoute } from 'vue-router'
import PairForm from './Form'

const route = useRoute()
const router = useRouter()
const pairs = usePairStore()

const pair = pairs.find(route.params.id) ?? router.push('/')

function save(item) {
  pairs.update(route.params.id, item.key, item.value)
  router.push('/')
}
</script>
