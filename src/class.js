export class Pair {
  constructor(key, value, tags = []) {
    this.id = id()
    this._type = 'PAIR'
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

  prepareScore(predicates) {
    let score = 0

    predicates.forEach((target) => {
      this.tags.forEach((tag) => {
        score += (tag.includes(target) ? 8 : 0)
      })

      if (this.value.toLowerCase().includes(target)) {
        score += 4
      }

      if (this.key.toLowerCase().includes(target)) {
        score += 2
      }
    })

    this.score = score
    return score
  }
}

export class Identity {
  constructor(hostId, username, password, tags = []) {
    this.id = id()
    this._type = 'IDENTITY'
    this.hostId = hostId
    this.username = username
    this.password = password
    this.tags = []

    if (Array.isArray(tags)) {
      this.tags = tags
    } else {
      throw new Error('tags argument must be array of string.')
    }
  }

  static make(hostId, username, password, tags = []) {
    return new this(hostId, username, password, tags)
  }

  prepareScore(predicates) {
    let score = 0

    predicates.forEach((target) => {
      this.tags.forEach((tag) => {
        score += (tag.includes(target) ? 8 : 0)
      })

      if (this.username.toLowerCase().includes(target)) {
        score += 2
      }
    })

    this.score = score
    return score
  }
}

export class Host {
  constructor(value, tags = []) {
    this.id = id()
    this._type = 'HOST'
    this.value = value

    if (Array.isArray(tags)) {
      this.tags = tags
    } else {
      throw new Error('tags argument must be array of string.')
    }
  }

  static make(value, tags = []) {
    return new this(value, tags)
  }

  prepareScore(predicates) {
    let score = 0

    predicates.forEach((target) => {
      this.tags.forEach((tag) => {
        score += (tag.includes(target) ? 8 : 0)
      })

      if (this.value.toLowerCase().includes(target)) {
        score += 4
      }
    })

    this.score = score
    return score
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
