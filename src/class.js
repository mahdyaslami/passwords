export class Pair {
  constructor(key, value) {
    this.id = Date.now()
    this.key = key
    this.value = value
  }

  static make(key, value) {
    return new this(key, value)
  }
}

export class Credential {
  constructor(title, host, username, password) {
    this.id = Date.now()
    this.title = title
    this.host = host
    this.username = username
    this.password = password
  }

  static make(title, host, username, password) {
    return new this(title, host, username, password)
  }
}
