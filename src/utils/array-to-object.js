export default function arrayToObject(arr, key) {
  return arr.reduce((obj, entry) => {
    const { [key]: keyValue, ...rest } = entry
    obj[keyValue] = rest
    return obj
  }, {})
}