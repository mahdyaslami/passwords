<template>
  <form @submit.prevent="$emit('save', state)">
    <base-label for="key">
      Key
    </base-label>
    <base-input
      id="key"
      v-model="state.key"
      class="mb-4"
      type="text"
    />

    <base-label for="value">
      Value
    </base-label>
    <base-input
      id="value"
      v-model="state.value"
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
  key: props.item.key,
  value: props.item.value,
})

defineEmits(['save'])

</script>
