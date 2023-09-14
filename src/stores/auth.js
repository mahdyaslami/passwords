import { reactive } from 'vue'

const auth = reactive({
  authenticated: false,
})

export function useAuthStore() {
  return auth
}
