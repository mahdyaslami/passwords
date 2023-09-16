import { reactive } from 'vue'
import { exportObjectAsJson, nextId, justArray } from '@/helpers'
import { useStorageStore } from './storage'

const storage = useStorageStore()

const database = reactive({
  rows: [],

  create(type, attributes, tags) {
    const item = {
      ...attributes,
      id: nextId(),
      type,
      tags: justArray(tags),
    }

    this.push(item)

    return item
  },

  push(obj) {
    this.rows.push(obj)
    storage.store(this.rows)
  },

  replace(id, obj) {
    const index = this.rows.findIndex(
      (el) => el.id == id,
    )

    this.rows[index] = obj
    storage.store(this.rows)
  },

  hosts() {
    return this.rows.filter((r) => r.type === 'HOST')
  },

  find(id) {
    return this.rows.find((el) => el.id == id)
  },

  search(predicate) {
    const predicates = predicate.split(' ')
      .map((p) => p.trim().toLowerCase())
      .filter((p) => p.length > 0)

    if (predicates.length == 0) {
      return this.rows
    }

    return this.rows.filter((r) => {
      // Search through tags
      if (predicates.some((p) => r.tags.some((t) => t.includes(p)))) {
        return true
      }

      // Get the keys that should participate in search
      const keys = Object.keys(r).filter(
        (k) => !['id', 'type', 'tags', 'hostId', 'password'].includes(k),
      )

      // Check value of keys
      if (predicates.some(
        (p) => keys.some((k) => r[k]?.toLowerCase().includes(p)),
      )) {
        return true
      }

      return false
    })
  },

  export() {
    exportObjectAsJson(this.rows, this._makeFilename())
  },

  _makeFilename() {
    const date = new Date().toLocaleDateString('fa-IR-u-nu-latn')
      .replaceAll('/', '-')
      .replaceAll()

    return `passwords-${date}`
  },

  import(arr) {
    this.rows = arr
  },
})

export function useDatabaseStore() {
  storage.fetch()
    .then((json) => database.import(json))

  return database
}
