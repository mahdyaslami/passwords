const drive = {
  async findOrCreate() {
    const files = await this.find('passwords.json')

    if (!files || files.length == 0) {
      const { result } = await this.create()
      return result
    }

    return files[0]
  },

  async find(name) {
    const response = await gapi.client.drive.files.list({
      pageSize: 10,
      fields: 'files(id, name)',
      q: `name = '${name}' and trashed = false`,
    })

    const { files } = response.result
    return files
  },

  async create() {
    return this.multipartRequest('POST', '/upload/drive/v3/files', [])
  },

  async update(id, json) {
    return this.multipartRequest('PATCH', `/upload/drive/v3/files/${id}`, json)
  },

  multipartRequest(method, path, json) {
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
      JSON.stringify(json)
    }${closeDelim}`

    return gapi.client.request({
      path,
      method,
      params: { uploadType: 'multipart' },
      headers: {
        'Content-Type': `multipart/related; boundary="${boundary}"`,
      },
      body: multipartRequestBody,
    })
  },

  async get(id) {
    const { result } = await gapi.client.drive.files.get({ fileId: id, alt: 'media' })
    return result
  },
}

export const google = {
  drive,
}
