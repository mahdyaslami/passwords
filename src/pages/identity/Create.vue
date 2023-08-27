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
        Create Identity
      </h1>
    </div>

    <identity-form @save="save" />
  </div>
</template>

<script setup>
import { useDatabaseStore } from '@/stores/database'
import { useRouter } from 'vue-router'
import IdentityForm from './Form'

const router = useRouter()
const database = useDatabaseStore()

function save(item) {
  const tags = item.tags.map((tag) => tag.trim())
  database.create('IDENTITY', { hostId: item.hostId, username: item.username, password: item.password }, tags)

  router.push('/')
}
</script>
