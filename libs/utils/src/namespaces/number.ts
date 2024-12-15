export const linearTransform = (
  value: number,
  inMin: number,
  inMax: number,
  outMin: number,
  outMax: number
) => {
  if (inMax === inMin) return value === inMax ? outMin : Number.NaN
  return ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin
}

export const fixed = (value: number, digits: number = 2): string => {
  if (value === 0) {
    return '0'
  }
  return parseFloat(`${value}`).toFixed(digits)
}
