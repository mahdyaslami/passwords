import { google } from './drive'

export const http = {
  fetch() {
    return fetch('/database.json')
      .then((response) => response.json())
  },

  store(arr) {
    // Save in a file is impossible.
  },
}

export const local = {
  fetch() {
    let item = localStorage.getItem('database')

    if (!item) {
      localStorage.setItem('database', '[]')
      item = '[]'
    }

    return Promise.resolve(JSON.parse(item))
  },

  store(arr) {
    return Promise.resolve(
      localStorage.setItem('database', JSON.stringify(arr)),
    )
  },
}

export const php = {
  routes: {
    fetch: `${import.meta.env.VITE_PHP_HOST}/server/fetch.php`,
    store: `${import.meta.env.VITE_PHP_HOST}/server/store.php`,
  },

  fetch() {
    return fetch(this.routes.fetch)
      .then((response) => response.json())
  },

  store(arr) {
    const form = new FormData()
    form.append('database', JSON.stringify(arr))

    return fetch(this.routes.store, {
      method: 'POST',
      body: form,
    })
  },
}

export const drive = {
  fileId: null,

  fetch() {
    return prepare().then((result) => {
      this.fileId = result.id
      return result.body
    })

    async function prepare() {
      const file = {
        id: (await google.drive.findOrCreate()).id,
        body: null,
      }

      file.body = google.drive.get(file.id)

      return file
    }
  },

  store(arr) {
    return google.drive.update(this.fileId, arr)
  },
}

export function storage() {
  const driver = import.meta.env.VITE_STORAGE

  return {
    local, php, http, drive,
  }[driver]
}
