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
        Create Host
      </h1>
    </div>

    <host-form @save="save" />
  </div>
</template>

<script setup>
import { useDatabaseStore } from '@/stores/database'
import { useRouter } from 'vue-router'
import HostForm from './Form'

const router = useRouter()
const database = useDatabaseStore()

function save(item) {
  const tags = item.tags.map((tag) => tag.trim())
  database.create('HOST', { value: item.value }, tags)

  router.push('/')
}
</script>
