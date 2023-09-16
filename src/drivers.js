import { google } from './google'

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
  file: null,
  name: import.meta.env.VITE_DRIVE_FILENAME ?? 'passwords-dev.json',

  fetch() {
    if (this.file) {
      return Promise.resolve(this.file.body)
    }

    return prepare(this.name).then((result) => {
      this.file = result
      return result.body
    })

    async function prepare(name) {
      const file = {
        id: (await google.drive.findOrCreate(name)).id,
        body: null,
      }

      file.body = google.drive.get(file.id)

      return file
    }
  },

  store(arr) {
    this.file.body = arr
    return google.drive.update(this.file.id, this.name, arr)
  },
}

export function storage() {
  const driver = import.meta.env.VITE_STORAGE

  return {
    local, php, http, drive,
  }[driver]
}
