<template>
  <div
    class="relative rounded-lg border border-gray-300 bg-white px-4 py-3
            shadow-sm flex items-center space-x-3 hover:border-gray-400 focus-within:ring-2
            focus-within:ring-offset-2 focus-within:ring-indigo-500 mb-2"
  >
    <div class="flex-1 min-w-0">
      <a
        href="#"
        class="focus:outline-none"
      >
        <router-link
          :to="`/identities/${item.id}/edit`"
          class="text-sm text-blue-600 underline float-right"
        >Edit</router-link>

        <p class="text-sm font-medium text-gray-900">
          Host
        </p>
        <p class="text-sm text-gray-500 truncate mb-2">
          {{ database.find(item.hostId)?.value }}
        </p>

        <p class="text-sm font-medium text-gray-900">
          Username
        </p>
        <p class="text-sm text-gray-500 truncate mb-2">
          {{ item.username }}
        </p>

        <p class="text-sm font-medium text-gray-900">
          Password
        </p>
        <p class="text-sm text-gray-500 truncate">
          {{ item.password }}
        </p>

        <div class="mt-4 float-left">
          <tag
            v-for="(tag, index) in item.tags"
            :key="index"
            class="mr-1"
          >{{ tag }}</tag>
        </div>
      </a>
    </div>
  </div>
</template>

<script setup>
import Tag from '@/components/Tag'
import { useDatabaseStore } from '@/stores/database'

const database = useDatabaseStore()

defineProps({
  item: {
    type: Object,
    required: true,
  },
})

</script>
