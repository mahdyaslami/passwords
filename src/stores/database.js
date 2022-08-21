import { reactive } from 'vue'
import { Pair, Identity } from '@/class'
import { exportObjectAsJson } from '@/helpers'

const database = reactive({
  rows: [
    Pair.make('External ip', '192.168.1.1', ['gitlab.com', 'test']),
    Identity.make('Signal', '192.168.1.1', 'mahdiaslami', '123456789', ['signal contest']),
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
})

export function useDatabaseStore() {
  return database
}
