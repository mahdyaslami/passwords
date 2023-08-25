<template>
  <form @submit.prevent="$emit('save', state)">
    <base-label for="host">
      Host
    </base-label>
    <base-select
      id="host"
      v-model="state.hostId"
      class="mb-4"
    >
      <option
        v-for="host in database.hosts()"
        :key="host.id"
        :value="host.id"
      >
        {{ host.value }}
      </option>
    </base-select>

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
import { computed, reactive, watch } from 'vue'
import BaseInput from '@/components/Input'
import BaseLabel from '@/components/Label'
import BaseButton from '@/components/Button'
import BaseSelect from '@/components/Select'
import { useDatabaseStore } from '@/stores/database'

const props = defineProps({
  item: {
    type: Object,
    default: () => ({
      hostId: null,
      username: '',
      password: '',
      tags: [],
    }),
  },
})

const database = useDatabaseStore()

const state = reactive({
  hostId: props.item.hostId,
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
