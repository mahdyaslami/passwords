<template>
  <form @submit.prevent="$emit('save', state)">
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

    <base-label for="tags">
      Tags (Separate by comma)
    </base-label>
    <base-input
      id="tags"
      v-model="tags"
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
import { computed, reactive } from 'vue'
import BaseInput from '@/components/Input'
import BaseLabel from '@/components/Label'
import BaseButton from '@/components/Button'

const props = defineProps({
  item: {
    type: Object,
    default: () => ({
      host: '',
      username: '',
      password: '',
      tags: [],
    }),
  },
})

const state = reactive({
  host: props.item.host,
  username: props.item.username,
  password: props.item.password,
  tags: props.item.tags,
})

const tags = computed({
  get() {
    return state.tags.join(',')
  },

  set(val) {
    state.tags = val.split(',')
  },
})

defineEmits(['save'])

</script>
