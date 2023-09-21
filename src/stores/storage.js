import { reactive } from 'vue'
import { manager } from '@/drivers'

const queue = {
  items: [],
  started: false,
  waiting: false,

  dispatch(callback) {
    this.items.push(callback)
  },

  run() {
    if (this.started) {
      return
    }

    this.started = true
    setInterval(async () => {
      if (this.waiting) {
        return
      }
      this.waiting = true

      if (this.items.length > 0) {
        const item = this.items.shift()
        await item()
      }

      this.waiting = false
    }, 2)
  },
}

const storage = reactive({
  driver: manager(),
  _loading: false,

  store(arr) {
    queue.dispatch(() => this.driver.store(arr))
  },

  fetch() {
    return this.driver.fetch()
  },
})

export function useStorageStore() {
  queue.run()
  return storage
}
