<script setup>
import { ref } from 'vue'
import { usePassword } from './hooks/passwords'

const { passwords, createGroup } = usePassword()

const title = ref('')

</script>

<template>
  <div>
    <form @submit.prevent="createGroup(title)">
      <input
        v-model="title"
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

    <div
      v-for="group in passwords"
      :key="group.id"
    >
      <h2>{{ group.title }}</h2>
    </div>
  </div>
</template>
