export function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export function snakeToCamel(str: string) {
  return str
    .toLowerCase()
    .replace(/([-_][a-z])/g, (group) => group.toUpperCase().replace('-', '').replace('_', ''))
}

export function areAllElementsSame(arr: unknown[]) {
  return arr.every((v) => v === arr[0])
}

export function isUniqueArray(arr: string[]) {
  const seenValues: Record<string, unknown> = {}

  for (let i = 0; i < arr.length; i++) {
    if (seenValues[arr[i]]) {
      return false
    } else {
      seenValues[arr[i]] = true
    }
  }

  return true
}

export function includeSome(arr: unknown[], arr2: unknown[]) {
  return arr.some((element) => arr2.includes(element))
}

export function isThereIntersection(setA: Set<unknown>, setB: Set<unknown>) {
  for (const elem of setB) {
    if (setA.has(elem)) {
      return true
    }
  }
  return false
}

export function formatDate(date: Date): string {
  return `${date.getUTCFullYear()}. ${
    date.getUTCMonth() + 1
  }. ${date.getUTCDate()}. ${date.getUTCHours()}:${`0${date.getUTCMinutes()}`.slice(
    -2
  )}:${`0${date.getUTCSeconds()}`.slice(-2)} UTC`
}

export const tableColumnRegEx = /[\w"`]+\.[\w"`]+/

export const emailRegEx = /\S+@\S+[.\S+]*/
