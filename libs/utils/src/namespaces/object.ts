export const exclude = <T, Key extends keyof T>(object: T, keys: Key[]): Omit<T, Key> => {
  if (!object) return object

  return Object.fromEntries(
    Object.entries(object).filter(([key]) => !keys.includes(key as Key))
  ) as Omit<T, Key>
}

export const snakeToCamel = (obj: object): object => {
  const camelCaseObj: Record<string, any> = {}

  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      const camelCaseKey = key.replace(/_([a-z])/g, function (match, letter) {
        return letter.toUpperCase()
      })
      // @ts-ignore
      camelCaseObj[camelCaseKey] = obj[key]
    }
  }

  return camelCaseObj
}
