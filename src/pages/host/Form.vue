<template>
  <form @submit.prevent="$emit('save', state)">
    <base-label for="value">
      Value
    </base-label>
    <base-input
      id="value"
      v-model="state.value"
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
import { reactive, computed } from 'vue'
import BaseInput from '@/components/Input'
import BaseLabel from '@/components/Label'
import BaseButton from '@/components/Button'

const props = defineProps({
  item: {
    type: Object,
    default: () => ({
      value: '',
      tags: [],
    }),
  },
})

const state = reactive({
  value: props.item.value,
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
