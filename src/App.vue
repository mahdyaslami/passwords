<script setup>
import { ref } from 'vue'
import { usePassword } from './hooks/passwords'

const password = usePassword()

const title = ref('')

</script>

<template>
  <div>
    <form @submit.prevent="password.createGroup(title)">
      <input
        class="border border-gray-400 py-2 rounded mr-2"
        type="text"
        required
      >

      <button
        class="bg-green-400 rounded shadow py-2 px-5"
        type="submit"
      >
        New Group
      </button>
    </form>

    <div>
      {{ password.passwords }}
    </div>
  </div>
</template>
