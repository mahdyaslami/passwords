export class Pair {
  constructor(key, value, tags = []) {
    this.id = id()
    this.key = key
    this.value = value

    if (Array.isArray(tags)) {
      this.tags = tags
    } else {
      throw new Error('tags argument must be array of string.')
    }
  }

  static make(key, value, tags = []) {
    return new this(key, value, tags)
  }
}

export class Identity {
  constructor(title, host, username, password, tags = []) {
    this.id = id()
    this.title = title
    this.host = host
    this.username = username
    this.password = password
    this.tags = []
  }

  static make(title, host, username, password) {
    return new this(title, host, username, password)
  }
}

function id() {
  return Math.floor(Math.random() * 1000000)
}
