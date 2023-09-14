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
        id: (await findOrCreate()).id,
        body: null,
      }

      const { result } = await gapi.client.drive.files.get({ fileId: file.id, alt: 'media' })
      file.body = result

      return file
    }

    async function findOrCreate() {
      const files = await find('passwords.json')

      if (!files || files.length == 0) {
        const { result } = await create()
        return result
      }

      return files[0]
    }

    async function find(name) {
      const response = await gapi.client.drive.files.list({
        pageSize: 10,
        fields: 'files(id, name)',
        q: `name = '${name}' and trashed = false`,
      })

      const { files } = response.result
      return files
    }

    async function create() {
      const boundary = '-------314159265358979323846'
      const delimiter = `\r\n--${boundary}\r\n`
      const closeDelim = `\r\n--${boundary}--`

      const contentType = 'application/json'

      const metadata = {
        name: 'passwords.json',
        mimeType: contentType,
      }

      const multipartRequestBody = `${delimiter
      }Content-Type: application/json\r\n\r\n${
        JSON.stringify(metadata)
      }${delimiter
      }Content-Type: ${contentType}\r\n\r\n${
        JSON.stringify([])
      }${closeDelim}`

      return gapi.client.request({
        path: '/upload/drive/v3/files',
        method: 'POST',
        params: { uploadType: 'multipart' },
        headers: {
          'Content-Type': `multipart/related; boundary="${boundary}"`,
        },
        body: multipartRequestBody,
      })
    }
  },

  store(arr) {

  },
}

export function storage() {
  const driver = import.meta.env.VITE_STORAGE

  return {
    local, php, http, drive,
  }[driver]
}
