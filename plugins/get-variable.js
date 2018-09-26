function getValue (obj) {
  if (obj.value) {
    if (Array.isArray(obj.value) && obj.value[0]) return getValue(obj.value[0])

    return getValue(obj.value)
  }

  return obj
}

module.exports = function getVariable (variable, frames) {
  const str = `@${variable}`

  for (let i = 0; i < frames.length; i++) {
    const frame = frames[i]

    if (frame._variables && frame._variables[str]) {
      return parseInt(getValue(frame._variables[str]), 10)
    }
  }

  return undefined
}
