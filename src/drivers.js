import { google } from './google'

export const link = {
  fetch() {
    return fetch('/database.json')
      .then((response) => response.json())
  },

  store(arr) {
    // Save is impossible.
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
    fetch: `${setting.storage.php.host}/server/fetch.php`,
    store: `${setting.storage.php.host}/server/store.php`,
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
  name: setting.storage.drive.filename,

  fetch() {
    return prepare(this.name).then((result) => {
      this.file = result
      return result.content
    })

    async function prepare(name) {
      const file = {
        id: (await google.drive.findOrCreate(name)).id,
        content: null,
      }

      file.content = google.drive.get(file.id)

      return file
    }
  },

  store(arr) {
    this.file.content = arr
    return google.drive.update(this.file.id, this.name, arr)
  },
}

export function manager() {
  const driver = setting.storage.default

  return {
    local, php, link, drive,
  }[driver]
}
