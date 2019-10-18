const chunk = (array: any[], size: number): any[] => {
  if (!array) return []
  const firstChunk = array.slice(0, size)
  if (!firstChunk.length) return array
  return [firstChunk].concat(chunk(array.slice(size, array.length), size))
}

export { chunk as default }
