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

function id() {
  return Math.floor(Math.random() * 1000000)
}
