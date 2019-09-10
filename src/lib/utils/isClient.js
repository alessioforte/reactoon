export default function isClient() {
  let isNode = false
  if (typeof module !== undefined && module.exports) {
    isNode = true
  }
  return !isNode
}
