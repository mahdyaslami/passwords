export class Pair {
  constructor(key, value, tags = []) {
    this.id = id()
    this._type = 'PAIR'
    this.key = key
    this.value = value
    this.tags = justArray(tags)
  }

  static make(key, value, tags = []) {
    return new this(key, value, tags)
  }
}

export class Identity {
  constructor(hostId, username, password, tags = []) {
    this.id = id()
    this._type = 'IDENTITY'
    this.hostId = hostId
    this.username = username
    this.password = password
    this.tags = justArray(tags)
  }

  static make(hostId, username, password, tags = []) {
    return new this(hostId, username, password, tags)
  }
}

export class Host {
  constructor(value, tags = []) {
    this.id = id()
    this._type = 'HOST'
    this.value = value
    this.tags = justArray(tags)
  }

  static make(value, tags = []) {
    return new this(value, tags)
  }
}

export class Factory {
  static map(item) {
    // eslint-disable-next-line no-underscore-dangle
    return Factory[`_${item._type}`](item)
  }

  static _PAIR(item) {
    return Pair.make(item.key, item.value, item.tags)
  }

  static _IDENTITY(item) {
    return Identity.make(item.host, item.username, item.password, item.tags)
  }

  static _HOST(item) {
    return Host.make(item.value, item.tags)
  }
}

function id() {
  return Math.floor(Math.random() * 1000000)
}

function justArray(target) {
  if (Array.isArray(target)) {
    return target
  }

  throw new Error('target argument must be array of string.')
}
