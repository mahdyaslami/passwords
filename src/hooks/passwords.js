import { ref } from 'vue'

const passwords = ref([])

function createGroup(title) {
  passwords.value.push({
    id: Date.now(),
    title,
    values: {},
  })
}

export function usePassword() {
  return {
    passwords,
    createGroup,
  }
}
