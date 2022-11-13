export const file = {
  fetch() {
    return fetch('/database.json')
      .then((response) => response.json())
  },

  store(data) {
    // Save in a file is impossible.
  },
}
