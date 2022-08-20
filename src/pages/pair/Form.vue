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
import { reactive } from 'vue'
import BaseInput from '@/components/Input'
import BaseLabel from '@/components/Label'
import BaseButton from '@/components/Button'
import { computed } from '@vue/reactivity'

const props = defineProps({
  item: {
    type: Object,
    default: () => ({
      key: '',
      value: '',
      tags: [],
    }),
  },
})

const state = reactive({
  key: props.item.key,
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
