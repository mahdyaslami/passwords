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

  push(obj) {
    obj.id = Date.now()
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

export function usePairStore() {
  return {
    create(key, value) {
      database.push({
        type: 'pair',
        key,
        value,
      })
    },

    update(id, key, value) {
      database.replace(id, {
        type: 'pair',
        id,
        key,
        value,
      })
    },

    find(id) {
      const r = database.find(id)

      if (r.type === 'pair') {
        return r
      }

      return null
    },
  }
}
