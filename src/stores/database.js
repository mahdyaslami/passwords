import { reactive } from 'vue'

const database = reactive({
  rows: [
    {
      id: 241123,
      type: 'pair',
      key: 'external ip',
      value: '192.168.1.1',
    },

    {
      id: 241124,
      type: 'credential',
      title: 'Signal',
      host: '192.168.1.1',
      username: 'mahdiaslami',
      password: '123456789',
    },
  ],

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
