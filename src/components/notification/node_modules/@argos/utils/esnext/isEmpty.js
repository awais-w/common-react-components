const isEmpty = (value) => {
  const array = Array.isArray(value) ? value : Object.keys(value || {})
  return array.length === 0
}

export default isEmpty
