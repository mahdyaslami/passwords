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
        Edit Host
      </h1>
    </div>

    <host-form
      :item="host"
      @save="save"
    />
  </div>
</template>

<script setup>
import { useDatabaseStore } from '@/stores/database'
import { useRouter, useRoute } from 'vue-router'
import HostForm from './Form'

const route = useRoute()
const router = useRouter()
const database = useDatabaseStore()

const host = database.find(route.params.id) ?? router.push('/')

function save(item) {
  host.key = item.key
  host.value = item.value
  host.tags = item.tags.map((tag) => tag.trim())
  database.replace(route.params.id, host)

  router.push('/')
}
</script>
