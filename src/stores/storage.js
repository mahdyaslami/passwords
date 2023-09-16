import { reactive } from 'vue'
import { manager } from '@/drivers'

const storage = reactive({
  driver: manager(),

  store() {
    return this.driver.store(this.rows)
  },

  fetch() {
    return this.driver.fetch()
  },
})

export function useStorageStore() {
  return storage
}
