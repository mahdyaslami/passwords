import { reactive } from 'vue'
import { Pair, Identity } from '@/class'

const database = reactive({
  rows: [
    Pair.make('External ip', '192.168.1.1', ['gitlab.com', 'test']),
    Identity.make('Signal', '192.168.1.1', 'mahdiaslami', '123456789'),
  ],

  push(obj) {
    this.rows.push(obj)
  },

  replace(id, obj) {
    const index = this.rows.findIndex(
      (el) => el.id == id,
    )

    this.rows[index] = obj
  },

  find(id) {
    return this.rows.find((el) => el.id == id)
  },
})

export function useDatabaseStore() {
  return database
}
