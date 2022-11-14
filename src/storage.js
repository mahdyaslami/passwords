export const file = {
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
