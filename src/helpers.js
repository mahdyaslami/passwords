export function exportObjectAsJson(obj, filename) {
  const dataStr = `data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(obj))}`
  const downloadAnchorNode = document.createElement('a')
  downloadAnchorNode.setAttribute('href', dataStr)
  downloadAnchorNode.setAttribute('download', `${filename}.json`)
  document.body.appendChild(downloadAnchorNode) // required for firefox
  downloadAnchorNode.click()
  downloadAnchorNode.remove()
}
