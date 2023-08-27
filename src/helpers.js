export function exportObjectAsJson(obj, filename) {
  const dataStr = `data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(obj))}`
  const downloadAnchorNode = document.createElement('a')
  downloadAnchorNode.setAttribute('href', dataStr)
  downloadAnchorNode.setAttribute('download', `${filename}.json`)
  document.body.appendChild(downloadAnchorNode) // required for firefox
  downloadAnchorNode.click()
  downloadAnchorNode.remove()
}

export function nextId() {
  return Math.floor(Math.random() * 1000000)
}

export function justArray(target) {
  if (Array.isArray(target)) {
    return target
  }

  throw new Error('target argument must be array of string.')
}
