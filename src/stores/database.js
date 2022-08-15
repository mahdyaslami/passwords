import { reactive } from 'vue'

const database = reactive({
  rows: [],

  createPair(key, value) {
    this.rows.push({
      id: this.nextId(),
      type: 'pair',
      key,
      value,
    })
  },

  nextId() {
    return Date.now()
  },
})

export function useDatabaseStore() {
  return database
}
