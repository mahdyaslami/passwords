import { reactive } from 'vue'
import { Factory, Host } from '@/class'
import { exportObjectAsJson } from '@/helpers'
import { storage } from '@/storage'

const database = reactive({
  storage: storage(),
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

  hosts() {
    return this.rows.filter((r) => r instanceof Host)
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
      if (r._type === 'HOST') {
        let score = 0

        predicates.forEach((target) => {
          r.tags.forEach((tag) => {
            score += (tag.includes(target) ? 8 : 0)
          })

          if (r.value.toLowerCase().includes(target)) {
            score += 4
          }
        })

        return score
      } if (r._type == 'IDENTITY') {
        let score = 0

        predicates.forEach((target) => {
          r.tags.forEach((tag) => {
            score += (tag.includes(target) ? 8 : 0)
          })

          if (r.username.toLowerCase().includes(target)) {
            score += 2
          }
        })

        return score
      } if (r._type) {
        let score = 0

        predicates.forEach((target) => {
          r.tags.forEach((tag) => {
            score += (tag.includes(target) ? 8 : 0)
          })

          if (r.value.toLowerCase().includes(target)) {
            score += 4
          }

          if (r.key.toLowerCase().includes(target)) {
            score += 2
          }
        })

        return score
      }

      return false
    }).sort((a, b) => a.score - b.score)
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
