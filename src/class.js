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
}
