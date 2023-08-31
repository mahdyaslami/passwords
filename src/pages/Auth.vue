<script setup>
import IconGoogle from '@/components/icons/IconGoogle'

</script>

<template>
  <div class="h-screen w-full flex justify-center items-center">
    <button
      class="border rounded-full bg-gray-100 transition-all
        duration-700 hover:shadow-lg"
    >
      <IconGoogle class="inline" />
      <span class="ml-2 mr-4">Authenticate by Google</span>
    </button>
  </div>
</template>
