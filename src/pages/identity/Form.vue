<template>
  <form @submit.prevent="$emit('save', state)">
    <base-label for="title">
      Title
    </base-label>
    <base-input
      id="title"
      v-model="state.title"
      class="mb-4"
      type="text"
    />

    <base-label for="host">
      Host
    </base-label>
    <base-input
      id="host"
      v-model="state.host"
      class="mb-4"
      type="text"
    />

    <base-label for="username">
      Username
    </base-label>
    <base-input
      id="username"
      v-model="state.username"
      class="mb-4"
      type="text"
    />

    <base-label for="password">
      password
    </base-label>
    <base-input
      id="password"
      v-model="state.password"
      class="mb-4"
      type="text"
    />

    <base-button
      type="submit"
    >
      Save
    </base-button>
  </form>
</template>

<script setup>
import { reactive } from 'vue'
import BaseInput from '@/components/Input'
import BaseLabel from '@/components/Label'
import BaseButton from '@/components/Button'

const props = defineProps({
  item: {
    type: Object,
    default: () => ({
      key: '',
      value: '',
    }),
  },
})

const state = reactive({
  title: props.item.title,
  host: props.item.host,
  username: props.item.username,
  password: props.item.password,
})

defineEmits(['save'])

</script>
