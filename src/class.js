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
  constructor(title, host, username, password, tags = []) {
    this.id = id()
    this._type = 'IDENTITY'
    this.title = title
    this.host = host
    this.username = username
    this.password = password
    this.tags = []

    if (Array.isArray(tags)) {
      this.tags = tags
    } else {
      throw new Error('tags argument must be array of string.')
    }
  }

  static make(title, host, username, password, tags = []) {
    return new this(title, host, username, password, tags)
  }

  prepareScore(predicates) {
    let score = 0

    predicates.forEach((target) => {
      this.tags.forEach((tag) => {
        score += (tag.includes(target) ? 8 : 0)
      })

      if (this.title.toLowerCase().includes(target)) {
        score += 4
      }

      if (this.host.toLowerCase().includes(target)) {
        score += 2
      }

      if (this.username.toLowerCase().includes(target)) {
        score += 2
      }

      if (this.password.toLowerCase().includes(target)) {
        score += 1
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
    return Identity.make(item.title, item.host, item.username, item.password, item.tags)
  }
}

function id() {
  return Math.floor(Math.random() * 1000000)
}
