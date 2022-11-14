import { reactive } from 'vue'
import { Factory } from '@/class'
import { exportObjectAsJson } from '@/helpers'
import { file, local } from '@/storage'

const database = reactive({
  storage: local,
  rows: [],

  push(obj) {
    this.rows.push(obj)
    this.store()
  },

  replace(id, obj) {
    const index = this.rows.findIndex(
      (el) => el.id == id,
    )

    this.rows[index] = obj
    this.store()
  },

  find(id) {
    return this.rows.find((el) => el.id == id)
  },

  search(predicate) {
    const predicates = predicate.split(' ')
      .map((p) => p.trim().toLowerCase())
      .filter((p) => p.length > 0)

    if (predicates.length > 0) {
      return this.rows.filter((r) => r.prepareScore(predicates) > 0)
        .sort((a, b) => a.score - b.score)
    }

    return this.rows
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

  store() {
    this.storage.store(this.rows)
  },

  fetch() {
    this.storage.fetch()
      .then((json) => this.import(json))
  },

  import(arr) {
    this.rows = arr.map((el) => Factory.map(el))
  },
})

database.fetch()

export function useDatabaseStore() {
  return database
}
