export function clearStorage() {
  const keys = Object.keys(localStorage)
  keys.forEach((key) => {
    if (key !== 'language') localStorage.removeItem(key)
  })
}
