<template>
  <div
    class="relative rounded-lg border border-gray-300 bg-white px-4 py-3
            shadow-sm flex items-center space-x-3 hover:border-gray-400 focus-within:ring-2
            focus-within:ring-offset-2 focus-within:ring-indigo-500"
  >
    <div class="flex-1 min-w-0">
      <a
        href="#"
        class="focus:outline-none"
      >
        <router-link
          :to="`/hosts/${item.id}/edit`"
          class="text-sm text-blue-600 underline float-right"
        >Edit</router-link>
        <p class="text-sm text-gray-500 truncate">
          {{ item.value }}
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

defineProps({
  item: {
    type: Object,
    required: true,
  },
})

</script>
